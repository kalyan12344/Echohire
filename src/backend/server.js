const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
require("./database");
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5001;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use(express.urlencoded({ extended: true }));
// Routes
const employerRouter = require("./routes/employer");
const jobApplicationRouter = require("./routes/job_application");
const jobSeekerRouter = require("./routes/job_seeker");
const jobRouter = require("./routes/jobs");
const ApplicationFormRouter = require("./routes/job_application_form");
const SavedJobRouter = require("./routes/saved-jobs");
const EmailRouter = require("./routes/email");
const WhoisRouter = require("./routes/whois");

app.use(employerRouter);
// app.use(jobApplicationRouter);
app.use(jobSeekerRouter);
app.use(jobRouter);
app.use(ApplicationFormRouter);
app.use(SavedJobRouter);
app.use(EmailRouter);
app.use(WhoisRouter);

module.exports = app;
