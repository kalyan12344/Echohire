const express = require('express');
const application = require('../models/job_application');
const router = new express.Router();

router.post("/api/jobapplication", async (req, res) => {
    try {
      const {
        title,
        description,
        qualifications,
        skills,
        location,
        type,
        deadline,
        salary,
        companyName,
        jobID,
        jsID,
        status,
      } = req.body;
  
      const existingApplication = await application.findOne({ jobID, jsID });
  
      if (existingApplication) {
        console.log("409");
        return res.status(409).json({ error: "Job application already exists" });
      }
  
      const newApplication = new application({
        title,
        description,
        qualifications,
        skills,
        location,
        type,
        deadline,
        salary,
        companyName,
        jsID,
        jobID,
        status: "Applied",
      });
  
      // Save the job application to the database
      await newApplication.save();
  
      // Send a success response
      res.status(201).json({ message: "Job applied successfully" });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get("/api/applications/:jsID", async (req, res) => {
    try {
      // Extract the company name from the request parameters
      const { jsID } = req.params;
      console.log(jsID);
      // Query the database for jobs associated with the given company name
      const applications = await application.find({ jsID: jsID });
  
      // Send the retrieved jobs as a response
      res.status(200).json({ applications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  module.exports = router;