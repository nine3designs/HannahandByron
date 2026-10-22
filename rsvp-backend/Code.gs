/**
 * RSVP endpoint for the Hannah & Byron wedding site.
 *
 * Copy this file into Apps Script opened from the couple-owned RSVP spreadsheet.
 * Fill in NOTIFICATION_EMAILS before deploying the web app.
 */
const RSVP_SHEET_NAME = "RSVPs";
const SPREADSHEET_ID = "PASTE_THE_ID_FROM_THE_SHEET_URL_HERE";
const NOTIFICATION_EMAILS = "bride@example.com,groom@example.com";
const RSVP_HEADERS = [
  "Submitted at",
  "Full name",
  "Email",
  "Attending",
  "Menu choice",
  "Allergies",
  "Song request",
  "Message"
];

function doPost(event) {
  const params = (event && event.parameter) || {};

  // Quietly accept honeypot submissions without recording or notifying.
  if (params.website) return htmlResponse_("Thank you. Your RSVP has been received.");

  const name = clean_(params.name, 160);
  const email = clean_(params.email, 254);
  const attending = clean_(params.attending, 40);
  const meal = clean_(params.meal, 100);
  const allergies = clean_(params.allergies, 2000);
  const song = clean_(params.song, 300);
  const message = clean_(params.message, 2000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return htmlResponse_("Please go back and check the name and email fields, then try again.");
  }

  let spreadsheet;
  try {
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    return htmlResponse_("We couldn't save your RSVP just now. Please try again later.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  let saved = false;
  try {
    const sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME) || spreadsheet.insertSheet(RSVP_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(RSVP_HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      safeCell_(name),
      safeCell_(email),
      safeCell_(attending),
      safeCell_(meal),
      safeCell_(allergies),
      safeCell_(song),
      safeCell_(message)
    ]);
    saved = true;
  } finally {
    lock.releaseLock();
  }

  if (saved) {
    const recipients = NOTIFICATION_EMAILS.split(",").map((address) => address.trim()).filter(Boolean);
    if (recipients.length && !recipients.some((address) => address.includes("example.com"))) {
      const details = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Attending: ${attending}`,
        `Menu: ${meal}`,
        `Allergies: ${allergies || "None listed"}`,
        `Song: ${song || "None listed"}`,
        `Message: ${message || "None"}`
      ].join("\n");
      try {
        MailApp.sendEmail(recipients.join(","), `New wedding RSVP: ${name}`, details);
      } catch (error) {
        console.error(`RSVP was saved, but the notification email could not be sent: ${error}`);
      }
    }
  }

  return htmlResponse_("Thank you — your RSVP has been received.");
}

function clean_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

// Prevent spreadsheet formula execution when a guest starts a response with =, +, - or @.
function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function htmlResponse_(message) {
  const escaped = message.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
  return HtmlService.createHtmlOutput(
    `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RSVP</title><body style="margin:0;background:#f5efe5;color:#51463b;font:18px Georgia,serif;display:grid;place-items:center;min-height:100vh;text-align:center"><main style="padding:32px;max-width:520px"><h1 style="font-weight:400">Hannah &amp; Byron</h1><p>${escaped}</p></main></body></html>`
  );
}
