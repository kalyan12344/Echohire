//  ** SUJITHA **
const express = require('express');
const Job = require('../models/jobs');
const router = new express.Router();

router.post("/api/jobpost", async (req, res) => {
    try {
      // Extract job data from request body
      console.log(req.body);
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
      } = req.body;
  
      // Create a new job instance
      const newJob = new Job({
        title,
        description,
        qualifications,
        skills,
        location,
        type,
        deadline,
        salary,
        companyName,
      });
      console.log(newJob);
      // Save the job to the database
      await newJob.save();
  
      // Send a success response
      res.status(200).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
// Vyjayanthi
  router.get("/api/jobs/:companyName", async (req, res) => {
    try {
      // Extract the company name from the request parameters
      const { companyName } = req.params;
      console.log(companyName);
      // Query the database for jobs associated with the given company name
      const jobs = await Job.find({ companyName: companyName });
  
      // Send the retrieved jobs as a response
      res.status(200).json({ jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  //jobs for js
  router.get("/api/jsjobs", async (req, res) => {
    try {
      const jobs = await Job.find();
  
      // Send the retrieved jobs as a response
      res.status(200).json({ jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  module.exports = router;