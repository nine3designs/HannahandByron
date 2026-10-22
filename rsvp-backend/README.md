# Couple-owned RSVP spreadsheet setup

This free Google Apps Script endpoint stores each RSVP in a private Google Sheet and emails both recipients configured in `NOTIFICATION_EMAILS`. The spreadsheet and script must be created and deployed from a Google account belonging to the couple, so the responses, script permissions, and notifications are not tied to the website designer.

## Set it up

1. While signed into the couple's Google account, create a blank Google Sheet. Share it with both partners if they use separate accounts; keep general access restricted.
2. Copy the spreadsheet ID from its URL (the text between `/d/` and `/edit`).
3. Open **Extensions → Apps Script** from that sheet. Replace the starter code with `Code.gs` from this folder.
4. In `SPREADSHEET_ID`, paste that ID. In `NOTIFICATION_EMAILS`, replace the example addresses with the bride and groom's email addresses.
5. Save. Choose **Deploy → New deployment → Web app**. Set **Execute as** to the couple's account and **Who has access** to **Anyone** so wedding guests can submit without signing in. Review Google's access warning and authorize the script.
6. Copy the deployed web app URL and provide it for the website connection.
7. Use **Deploy → Test deployments** for a test request before replacing the live form destination. Do not use a real guest RSVP as a test.

The response sheet stays private even though the submission endpoint accepts public requests. Email notices are sent by the deploying Google account; free personal Google accounts currently have a daily sending quota (100 recipients/day), which Google can change. See [Apps Script quotas](https://developers.google.com/apps-script/guides/services/quotas).

The current site form remains connected to Formspree until the couple-owned deployment URL is available, so no submissions are lost during setup.
