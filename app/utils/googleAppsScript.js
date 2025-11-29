/**
 * MASTER BACKEND for:
 * 🐞 Bug Reports
 * 💡 Enhancement Suggestions
 * 📩 Contact Us
 *
 * Handles:
 * - Form submission
 * - File upload to Google Drive
 * - Writable shareable link
 * - Sheet row insertion
 * - Email notification
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const bugSheet = ss.getSheetByName("BugReports");
    const enhSheet = ss.getSheetByName("Enhancements");
    const contactSheet = ss.getSheetByName("ContactUs");

    const folder = DriveApp.getFolderById("YOUR_DRIVE_FOLDER_ID");

    const type = e.parameter.type;
    const email = e.parameter.email || "";
    const description = e.parameter.description || "";
    const steps = e.parameter.steps || "";

    let artefactLink = "";

    /**
     * ================
     * Handle File Upload
     * ================
     */
    if (e.files && e.files.file) {
      const blob = e.files.file;

      const uploadedFile = folder.createFile(blob);
      uploadedFile.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );

      artefactLink = uploadedFile.getUrl();
    }

    const timestamp = new Date();

    /**
     * ================
     * Insert into Sheets
     * ================
     */
    if (type === "bug") {
      bugSheet.appendRow([
        timestamp,
        email,
        description,
        steps,
        artefactLink,
      ]);
    }

    if (type === "enhancement") {
      enhSheet.appendRow([timestamp, email, description]);
    }

    if (type === "contact") {
      contactSheet.appendRow([timestamp, email, description]);
    }

    /**
     * ================
     * Send Email to You
     * ================
     */
    MailApp.sendEmail({
      to: "YOUR_EMAIL@gmail.com",
      subject: `NEW ${type.toUpperCase()} SUBMISSION`,
      htmlBody: `
        <h2>${type.toUpperCase()} Received</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Description:</b> ${description}</p>

        ${
          steps
            ? `<p><b>Steps to Reproduce:</b><br>${steps.replace(/\n/g, "<br>")}</p>`
            : ""
        }

        ${
          artefactLink
            ? `<p><b>Artefact:</b> <a href="${artefactLink}" target="_blank">${artefactLink}</a></p>`
            : "<p><i>No artefact uploaded.</i></p>"
        }

        <br/>
        <p><b>Google Sheet:</b> <a href="${ss.getUrl()}" target="_blank">Open Sheet</a></p>
      `,
    });

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService.createTextOutput("ERROR: " + error);
  }
}
