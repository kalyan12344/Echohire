const express = require("express");
const whois = require("whois-json");

const router = new express.Router();

// Route to handle domain verification
router.get("/verify-domain", async (req, res) => {
  const domain = req.query.domain;

  try {
    const domainInfo = await whois(domain);
    if (domainInfo && domainInfo.registrar) {
      // Domain is registered
      res.json({ success: true, message: "Domain is registered", domainInfo });
    } else {
      // Domain is not registered
      res.json({ success: false, message: "Domain is not registered" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to verify domain" });
  }
});

// Start the server
module.exports = router;
