// Updated Google Apps Script for MARKETPEACE
// Supports Vendors, Attendees, and Venues with Stripe Payment Status tracking and Email Confirmations.

const SHEET_ID = '1Hu-cS4FzSj5qbmAOxKgVbBH7rthPurNilgLkXxmjVAM';
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1499679190679687178/S3He0HVRUR87TnZ96ndErcvqnZUPRnYSYwEZf0hWzZtXssOFH9waV1mrSzc8yFfMBrYL';

// --- EDITABLE EMAIL CONFIGURATION BLOCK ---
// ... (rest of EMAIL_CONFIG remains same)
const EMAIL_CONFIG = {
  SENDER_NAME: 'MarketPeace Team',

  VENDOR: {
    subject: "🎉 You're In! Your Vendor Spot is Secured at MarketPeace",
    body: `Hello {NAME},

Welcome to the MarketPeace family! We're excited to confirm your vendor registration is paid and secured.

**Your Confirmation Details:**
Business: {BUSINESS}
Transaction ID: {TID}
Amount Paid: ${AMOUNT}

**What's Next?**
Keep this email for your records. Within 3-5 days, you'll receive:
- Event timeline & load-in instructions
- Promotional materials featuring your brand
- Social media schedule & vendor spotlight details

**Questions?**
We're here to help! Reach out anytime:
📧 Email: [your-email@marketpeace.com]
📱 Phone: [your-phone-number]
🌐 Website: [www.marketpeace.com]

You're not just renting a booth — you're joining a community of creators ready to shine.

Let's make this amazing!

Best,
The MarketPeace Team`
  },

  ATTENDEE: {
    subject: "🎟️ You're All Set! Your MarketPeace Ticket Confirmed",
    body: `Hi {NAME}!

Thanks for joining us! Your ticket for MarketPeace is confirmed and we can't wait to see you.

**Your Ticket Info:**
Ticket Type: {TICKET_TYPE}
Transaction ID: {TID}
Amount Paid: ${AMOUNT}

**Event Day Reminder:**
Show this email at the entrance for entry. Arrive early for:
- Goodie bags (first 100 attendees!)
- Free photo booth sessions
- Raffle entry & prizes

**Got Questions?**
We're here to help:
📧 Email: [your-email@marketpeace.com]
📱 Phone: [your-phone-number]
🌐 Website: [www.marketpeace.com]

Follow us @[your-instagram] for sneak peeks, vendor highlights, and event updates!

See you soon!

The MarketPeace Team`
  }
};

const SHEETS = {
  VENDOR: 'Vendors',
  ATTENDEE: 'Attendees',
  VENUE: 'Venues',
  CONTACT: 'Inquiries'
};

function sendDiscordNotification(title, message, color = 3447003) {
  try {
    const payload = {
      embeds: [{
        title: title,
        description: message,
        color: color,
        timestamp: new Date().toISOString(),
        footer: { text: "MARKETPEACE Infrastructure Monitor" }
      }]
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
  } catch (e) {
    console.error("Discord Notify Error: " + e.toString());
  }
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const data = JSON.parse(e.postData.contents);
    const action = data.action || 'submit';

    if (action === 'submit') {
      return handleSubmit(ss, data);
    } else if (action === 'updateStatus') {
      return handleUpdateStatus(ss, data);
    }
  } catch (error) {
    sendDiscordNotification("⚠️ System Error", `**Action:** doPost\n**Error:** ${error.toString()}`, 15158332);
    return createResponse({ result: 'error', error: error.toString() });
  }
}

function handleSubmit(ss, data) {
  const type = data.type.toUpperCase();
  const sheetName = SHEETS[type] || 'General';
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headers = getHeaders(type);
    sheet.appendRow(headers);
  }

  const rowData = getRowData(type, data);
  sheet.appendRow(rowData);

  sendDiscordNotification(
    "📝 New Submission",
    `**Type:** ${type}\n**Identity:** ${data.email || 'N/A'}\n**Name:** ${data.name || 'N/A'}\n**Status:** Pending`,
    3447003
  );

  return createResponse({ result: 'success', message: 'Data added as Pending' });
}

function handleUpdateStatus(ss, data) {
  const { type, transactionID, status, receiptURL } = data;
  const sheetName = SHEETS[type.toUpperCase()];
  const sheet = ss.getSheetByName(sheetName);

  if (!sheet) return createResponse({ result: 'error', message: 'Sheet not found' });

  const rows = sheet.getDataRange().getValues();
  const idIndex = 1; // ID is in column B

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idIndex] === transactionID) {
      sheet.getRange(i + 1, 3).setValue(status);
      const receiptCol = type.toUpperCase() === 'VENDOR' ? 11 : 10;
      sheet.getRange(i + 1, receiptCol).setValue(receiptURL || '');

      sendDiscordNotification(
        status === 'Paid' ? "💰 Payment Received" : "🔄 Status Update",
        `**Type:** ${type}\n**ID:** ${transactionID}\n**Status:** ${status}`,
        status === 'Paid' ? 3066993 : 15105570
      );

      if (status === 'Paid') {
        const row = rows[i];
        let emailData = {};

        if (type.toUpperCase() === 'VENDOR') {
          emailData = {
            email: row[5],
            name: row[3],
            business: row[4],
            amount: row[8],
            tid: transactionID
          };
        } else if (type.toUpperCase() === 'ATTENDEE') {
          emailData = {
            email: row[4],
            name: row[3],
            ticketType: row[5],
            amount: row[7],
            tid: transactionID
          };
        }

        if (emailData.email) {
          sendConfirmationEmail(type.toUpperCase(), emailData);
        }
      }

      return createResponse({ result: 'success', message: 'Status updated and email triggered' });
    }
  }

  return createResponse({ result: 'error', message: 'Transaction ID not found' });
}

function sendConfirmationEmail(type, data) {
  const config = EMAIL_CONFIG[type];
  if (!config) return;

  let subject = config.subject;
  let body = config.body;

  body = body.replace(/{NAME}/g, data.name || '')
    .replace(/{TID}/g, data.tid || '')
    .replace(/{AMOUNT}/g, data.amount || '')
    .replace(/{BUSINESS}/g, data.business || '')
    .replace(/{TICKET_TYPE}/g, data.ticketType || '');

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    name: EMAIL_CONFIG.SENDER_NAME
  });
}

function getHeaders(type) {
  switch (type) {
    case 'VENDOR':
      return ['Timestamp', 'TransactionID', 'Status', 'Name', 'BusinessName', 'Email', 'Instagram', 'PaymentMethod', 'Amount', 'StripeSessionID', 'ReceiptURL'];
    case 'ATTENDEE':
      return ['Timestamp', 'TransactionID', 'Status', 'Name', 'Email', 'TicketType', 'Referrer', 'Amount', 'StripeSessionID', 'ReceiptURL'];
    case 'VENUE':
      return ['Timestamp', 'Status', 'VenueName', 'ContactName', 'Email', 'Phone', 'Location', 'Capacity', 'Notes'];
    case 'CONTACT':
      return ['Timestamp', 'Name', 'Email', 'Subject', 'Message'];
    default:
      return ['Timestamp', 'Data'];
  }
}

function getRowData(type, data) {
  const ts = data.timestamp || new Date().toISOString();
  const status = data.status || 'Pending';
  const tid = data.transactionID || '';

  switch (type) {
    case 'VENDOR':
      return [ts, tid, status, data.name, data.businessName, data.email, data.instagram, data.paymentMethod, data.amount || '150', data.stripeID || '', ''];
    case 'ATTENDEE':
      return [ts, tid, status, data.name, data.email, data.ticketType || 'Standard', data.referrer || '', data.amount || '5', data.stripeID || '', ''];
    case 'VENUE':
      return [ts, status, data.venueName, data.name, data.email, data.phone, data.location, data.capacity, data.notes];
    case 'CONTACT':
      return [ts, data.name, data.email, data.subject, data.message];
    default:
      return [ts, JSON.stringify(data)];
  }
}

function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Auto-Update Function
 * Trigger this every 1-5 minutes via Apps Script Triggers.
 */
function autoUpdateSystem() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const now = new Date();

    // Summary pulse once an hour
    if (now.getMinutes() < 5) {
      let stats = "";
      Object.keys(SHEETS).forEach(key => {
        const sheet = ss.getSheetByName(SHEETS[key]);
        if (sheet) stats += `**${key}:** ${sheet.getLastRow() - 1} entries\n`;
      });

      sendDiscordNotification(
        "📡 System Health Pulse",
        `Infrastructure is active.\n\n${stats}`,
        3447003
      );
    }
  } catch (e) {
    console.error("AutoUpdate Error: " + e.toString());
  }
}
