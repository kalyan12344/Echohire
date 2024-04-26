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

router.get("/api/employerapplications/:employerID", async (req, res) => {
  try {
    const { employerID } = req.params;

    // Query the database for applications associated with the given employer ID
    const applications = await ApplicationForm.aggregate([
      {
        $lookup: {
          from: "Job", // Replace with your Job collection name
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $match: {
          "jobDetails.companyName": employerID,
        },
      },
    ]);
    console.log(applications);
  } catch (error) {
    console.error(
      `Error fetching applications for employer ID ${employerID}:`,
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/api/applications/:id", async (req, res) => {
  try {
    // Extract the application ID from the request parameters
    const { id } = req.params;

    // Use Mongoose to find and delete the application by ID
    const deletedApplication = await ApplicationForm.findByIdAndDelete(id);

    if (!deletedApplication) {
      // If no application is found with the given ID, return a 404 Not Found response
      return res.status(404).json({ message: "Application not found" });
    }

    // If the application is successfully deleted, return a success response
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    // If an error occurs, return a 500 Internal Server Error response
    console.error("Error deleting application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/company/:companyId/jobforms", async (req, res) => {
  try {
    const companyId = req.params.companyId;
    console.log("companyId for forms:", companyId);
    // Find all jobs of the company
    const jobs = await Job.find({ companyName: companyId });

    // Extract job IDs
    const jobIds = jobs.map((job) => job._id);
    console.log(jobIds);
    // Find all application forms associated with those job IDs
    const jobForms = await ApplicationForm.find({
      jobId: { $in: jobIds },
    }).populate("jobId");
    console.log(jobForms);
    res.json(jobForms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/api/updateapplication/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the application by id and update its status
    const updatedApplication = await ApplicationForm.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log(updatedApplication);

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res
      .status(200)
      .json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
