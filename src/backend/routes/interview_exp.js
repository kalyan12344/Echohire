const express = require("express");
const router = express.Router();
const InterviewExperience = require("../models/interview_exp.js");

// GET /api/interview-experiences - Retrieve all interview experiences
router.get("/api/interview-experiences", async (req, res) => {
  try {
    // Retrieve all interview experiences from the database
    const experiences = await InterviewExperience.find();

    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error retrieving interview experiences:", error);
    res.status(500).json({ error: "Failed to retrieve interview experiences" });
  }
});

router.post("/api/interview-experiences", async (req, res) => {
  try {
    console.log(req.body);
    const { companyName, jobSeekerName, experience } = req.body;

    // Create a new interview experience instance
    const newExperience = new InterviewExperience({
      companyName,
      jobSeekerName,
      experience,
    });

    // Save the new experience to the database
    await newExperience.save();

    res
      .status(201)
      .json({ message: "Interview experience added successfully" });
  } catch (error) {
    console.error("Error adding interview experience:", error);
    res.status(500).json({ error: "Failed to add interview experience" });
  }
});

module.exports = router;
