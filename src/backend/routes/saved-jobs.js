const express = require("express");
const router = express.Router();
const SavedJob = require("../models/saved-jobs"); // Import the SavedJob model
const { useParams } = require("react-router-dom");

// GET route to retrieve all saved jobs
router.get("/api/saved-jobs/:jsId", async (req, res) => {
  const jsId = useParams();
  try {
    // Fetch saved jobs and populate job details
    const savedJobs = await SavedJob.find({ jsId: jsId })
      .populate("jsId") // Populate job seeker details
      .populate("jobId", "title location type deadline salary companyName"); // Populate job details

    res.status(200).json({ savedJobs });
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.put("/api/saved-jobs", async (req, res) => {
  try {
    const { jsId, jobData } = req.body;
    console.log(jsId, jobData);
    let jobId = jobData._id;
    // Check if the job already exists for the user
    const existingSavedJob = await SavedJob.findOne({ jsId, jobData });

    if (existingSavedJob) {
      return res.status(400).json({ message: "Job already saved" });
    }

    // Create a new SavedJob instance
    const savedJob = new SavedJob({
      jsId,
      jobId,
    });

    // Save the job to the database
    await savedJob.save();

    res.status(201).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
