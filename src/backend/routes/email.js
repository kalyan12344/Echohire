// Backend server using Node.js and Express
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// Middleware to parse JSON bodies
const router = new express.Router();

// POST endpoint to trigger email sending
router.post("/api/send-email", async (req, res) => {
  const { subject, message } = req.body;

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "kalyanraju90@gmail.com",
        pass: "lnnd ugxk xwjj udhx",
      },
    });

    // Define email options
    const mailOptions = {
      from: "kalyanraju90@gmail.com",
      to: "kalyanraju90@gmail.com",
      subject: subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

// Start the server
