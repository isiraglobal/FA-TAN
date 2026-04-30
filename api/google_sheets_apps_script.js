// Updated Google Apps Script for MARKETPEACE
// Supports Vendors, Attendees, and Venues with Stripe Payment Status tracking and Email Confirmations.

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// --- EDITABLE EMAIL CONFIGURATION BLOCK ---
const EMAIL_CONFIG = {
  SENDER_NAME: 'MarketPeace Team',
  
  VENDOR: {
    subject: 'Confirmation: Your Vendor Spot is Secured!',
    body: 'Hello {NAME},\n\nWe are excited to confirm that your vendor registration for MarketPeace is now PAID and secured.\n\nBusiness: {BUSINESS}\nTransaction ID: {TID}\nAmount Paid: ${AMOUNT}\n\nPlease keep this email for your records. We will follow up soon with setup details.\n\nBest,\nThe MarketPeace Team'
  },
  
  ATTENDEE: {
    subject: 'Your MarketPeace Ticket Confirmation',
    body: 'Hi {NAME}!\n\nYour ticket for MarketPeace has been confirmed.\n\nTicket Type: {TICKET_TYPE}\nTransaction ID: {TID}\nAmount Paid: ${AMOUNT}\n\nShow this email at the entrance for entry.\n\nSee you there!\nMarketPeace Team'
  }
};
// ------------------------------------------

const SHEETS = {
  VENDOR: 'Vendors',
  ATTENDEE: 'Attendees',
  VENUE: 'Venues'
};

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
      // Update Status column (Column C)
      sheet.getRange(i + 1, 3).setValue(status);
      
      // Update Receipt URL column
      const receiptCol = type.toUpperCase() === 'VENDOR' ? 11 : 10;
      sheet.getRange(i + 1, receiptCol).setValue(receiptURL || '');

      // Trigger Email if Status is Paid
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

  // Replace placeholders
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
    default:
      return [ts, JSON.stringify(data)];
  }
}

function createResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
