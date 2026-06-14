const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html, text }) => {
  const hasSmtpConfig =
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS;

  if (!hasSmtpConfig) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL || `"CoFound Platform" <noreply@cofound.com>`,
    to,
    subject,
    text,
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.messageId}`);
  return info;
};

module.exports = sendEmail;
