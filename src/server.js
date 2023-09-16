const express = require("express");
const app = express();
const emailValidator = require("email-validator");

app.use(express.json());

app.post("/api/emailFormat", async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  try {
    const emails = await getEmailsFromDomain(domain);
    const formats = analyzeEmailFormats(emails);
    return res.json({ formats });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

function getEmailsFromDomain(domain) {
  // This function should return a list of emails from the given domain.
  // The implementation depends on your specific use case.
}

function analyzeEmailFormats(emails) {
  const formats = {};

  emails.forEach((email) => {
    if (emailValidator.validate(email)) {
      const [local, domain] = email.split("@");
      const format = local.replace(/[^@]+/g, "*") + "@" + domain;
      formats[format] = (formats[format] || 0) + 1;
    }
  });

  return formats;
}

app.listen(3000, () => console.log("Server is running on port 3000"));
