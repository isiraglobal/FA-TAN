/**
 * MARKETPEACE Idempotent Backend Script
 * 
 * This script handles registrations for both Vendors and Attendees.
 * It prevents duplicate email dispatches by checking for existing records.
 * 
 * Setup Instructions:
 * 1. Open your Google Sheet.
 * 2. Extensions -> Apps Script.
 * 3. Paste this code.
 * 4. Replace placeholders (Spreadsheet ID, Sheet Name, etc.).
 * 5. Deploy -> New Deployment -> Web App (Set "Who has access" to "Anyone").
 */

const CONFIG = {
  EMAIL_SENT_STATUS: "SENT",
  EMAIL_COLUMN_INDEX: 2, // Column C (0-indexed)
  STATUS_COLUMN_INDEX: 10, // Column K (0-indexed) - Adjust based on your sheet
  SUBJECT: "Your MARKETPEACE Access - Position Secured",
  SENDER_NAME: "MARKETPEACE System",
  DISCORD_WEBHOOK_URL: "https://discord.com/api/webhooks/1499679190679687178/S3He0HVRUR87TnZ96ndErcvqnZUPRnYSYwEZf0hWzZtXssOFH9waV1mrSzc8yFfMBrYL"
};

function sendDiscordNotification(title, message, color = 3447003) {
  const payload = {
    embeds: [{
      title: title,
      description: message,
      color: color,
      timestamp: new Date().toISOString(),
      footer: { text: "MARKETPEACE System Monitor" }
    }]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(CONFIG.DISCORD_WEBHOOK_URL, options);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const params = e.parameter;
    const email = params.email;
    
    if (!email) {
      throw new Error("Missing email parameter");
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    let existingRowIndex = -1;
    let alreadySent = false;

    // Search for existing email
    for (let i = 1; i < values.length; i++) {
      if (values[i][CONFIG.EMAIL_COLUMN_INDEX] === email) {
        existingRowIndex = i + 1; // 1-indexed row number
        if (values[i][CONFIG.STATUS_COLUMN_INDEX] === CONFIG.EMAIL_SENT_STATUS) {
          alreadySent = true;
        }
        break;
      }
    }

    if (alreadySent) {
      return response({
        result: "success",
        status: "idempotent",
        message: "Email already dispatched for this identity."
      });
    }

    // Prepare row data (Customize based on your sheet structure)
    const timestamp = new Date();
    const rowData = [
      timestamp,
      params.name || "N/A",
      email,
      params.businessName || "N/A",
      params.instagram || "N/A",
      params.ticketType || params.paymentMethod || "N/A",
      JSON.stringify(params) // Store full payload for safety
    ];

    const isNew = existingRowIndex === -1;
    if (isNew) {
      // New record
      sheet.appendRow(rowData);
      existingRowIndex = sheet.getLastRow();
      sendDiscordNotification(
        "🚀 New System Entry",
        `**Identity:** ${email}\n**Type:** ${params.businessName ? "Vendor" : "Attendee"}\n**Name:** ${params.name}\n**Details:** ${params.ticketType || params.paymentMethod || "N/A"}`,
        3066993 // Green
      );
    } else {
      // Update existing record
      sheet.getRange(existingRowIndex, 1, 1, rowData.length).setValues([rowData]);
      sendDiscordNotification(
        "🔄 System Update",
        `**Identity:** ${email}\n**Action:** Profile Sync / Update`,
        15105570 // Orange
      );
    }

    // Dispatch Email
    sendRegistrationEmail(email, params);

    // Update Status
    sheet.getRange(existingRowIndex, CONFIG.STATUS_COLUMN_INDEX + 1).setValue(CONFIG.EMAIL_SENT_STATUS);

    return response({
      result: "success",
      status: "dispatched",
      message: "Access secured and email dispatched."
    });

  } catch (error) {
    sendDiscordNotification(
      "⚠️ System Error",
      `**Error:** ${error.toString()}`,
      15158332 // Red
    );
    return response({
      result: "error",
      message: error.toString()
    }, 400);
  }
}

function sendRegistrationEmail(email, params) {
  const name = params.name || "Member";
  const type = params.businessName ? "Vendor Node" : "Attendee Access";
  
  const body = `
    Hello ${name},

    This is a confirmation that your position in the MARKETPEACE system has been secured.
    
    Type: ${type}
    Identity: ${email}
    
    The rollout sequence has been initialized. You will receive further synchronization details as we approach the city activation date.
    
    Welcome to the movement.
    
    — ${CONFIG.SENDER_NAME}
  `;

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #061530;">
      <h1 style="text-transform: uppercase; letter-spacing: 2px;">Position Secured</h1>
      <p>Hello <strong>${name}</strong>,</p>
      <p>Your identity has been verified and your position in the <strong>MARKETPEACE</strong> system is now active.</p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Type:</strong> ${type}</p>
        <p style="margin: 0;"><strong>Identity:</strong> ${email}</p>
      </div>
      <p>The rollout sequence has been initialized. Further synchronization will occur via this channel.</p>
      <p style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px; font-size: 12px; color: #888;">
        &copy; 2026 MARKETPEACE GLOBAL. ALL RIGHTS RESERVED.
      </p>
    </div>
  `;

  MailApp.sendEmail({
    to: email,
    subject: CONFIG.SUBJECT,
    name: CONFIG.SENDER_NAME,
    body: body,
    htmlBody: htmlBody
  });
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CityData");
    if (!sheet) {
      return response({ error: "Sheet 'CityData' not found. Please create it." }, 404);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    
    const result = data.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    return response(result);
  } catch (error) {
    return response({ error: error.toString() }, 500);
  }
}

function response(obj, code) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Auto-Update Function
 * Setup: In Apps Script, go to Triggers -> Add Trigger -> Choose 'autoUpdateSystem' 
 * -> Event Source: Time-driven -> Type: Minutes timer -> Interval: 1 or 5 minutes.
 */
function autoUpdateSystem() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    let pendingCount = 0;

    // Scan for any rows where status is NOT "SENT" (Column K / Index 10)
    for (let i = 1; i < data.length; i++) {
      if (data[i][CONFIG.STATUS_COLUMN_INDEX] !== CONFIG.EMAIL_SENT_STATUS) {
        pendingCount++;
      }
    }

    if (pendingCount > 0) {
      sendDiscordNotification(
        "📊 System Audit",
        `**Pending Tasks:** ${pendingCount} unprocessed nodes found in queue.\n**Action:** Manual sync or system restart recommended if persistence continues.`,
        15844367 // Gold
      );
    } else {
      // Periodic heartbeat (Optional: only sends once an hour to avoid noise)
      const now = new Date();
      if (now.getMinutes() === 0) {
        sendDiscordNotification(
          "📡 System Pulse",
          "All nodes synchronized. Infrastructure operational.",
          3447003 // Blue
        );
      }
    }

  } catch (error) {
    console.error("AutoUpdate Error: " + error.toString());
  }
}
