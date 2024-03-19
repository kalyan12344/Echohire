//  Bhanuja
const express = require("express");
const router = new express.Router();
const multer = require("multer");
const fs = require("fs");
const ApplicationForm = require("../models/job_application_form");
const Job = require("../models/jobs");
const upload = multer({ dest: "uploads/" });

router.post("/application/post", upload.single("resume"), async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      dateOfBirth,
      nationality,
      employmentHistory,
      education,
      skills,
      coverLetter,
      references,
      availability,
      termsAgreed,
      jsId,
      jobId,
    } = req.body;

    const existingApplication = await ApplicationForm.findOne({ jsId, jobId });

    if (existingApplication) {
      console.log("409");
      return res.status(409).json({ error: "Job application already exists" });
    }
    // Read the uploaded file
    const resumeData = fs.readFileSync(req.file.path);

    // Create a new application form instance
    const applicationForm = new ApplicationForm({
      firstname,
      lastname,
      email,
      phone,
      address,
      dateOfBirth,
      nationality,
      employmentHistory,
      education,
      skills,
      coverLetter,
      references,
      availability,
      termsAgreed,
      resume: {
        data: resumeData,
        contentType: req.file.mimetype,
      },
      jsId,
      jobId,
      status: "Applied",
    });

    // Save the application form to the database
    await applicationForm.save();

    // Remove the temporary uploaded file
    fs.unlinkSync(req.file.path);

    // Respond with success message
    res.status(201).json({ message: "Applied successfully" });
  } catch (error) {
    console.error("Error applying to the job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/application/:id", async (req, res) => {
  try {
    const applicationForm = await ApplicationForm.findById(req.params.id);
    if (!applicationForm) {
      return res.status(404).json({ error: "Application form not found" });
    }
    res.status(200).json(applicationForm);
  } catch (error) {
    console.error("Error retrieving application form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/application/resume/:id", async (req, res) => {
  try {
    const applicationForm = await ApplicationForm.findById(req.params.id);
    if (!applicationForm) {
      return res.status(404).json({ error: "Application form not found" });
    }
    // Set headers to force browser to download the file
    res.set({
      "Content-Type": applicationForm.resume.contentType,
      "Content-Disposition": "attachment; filename=resume.pdf", // Change the filename if needed
    });
    res.send(applicationForm.resume.data);
  } catch (error) {
    console.error("Error retrieving application form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/applications/:jsID", async (req, res) => {
  try {
    // Extract the company name from the request parameters
    const { jsID } = req.params;
    console.log(jsID);
    // Query the database for jobs associated with the given company name
    const applications = await ApplicationForm.find({ jsId: jsID }).populate(
      "jobId"
    );
    // Send the retrieved jobs as a response
    res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
