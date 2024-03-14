const express = require('express');
const Js = require('../models/job_seeker');
const router = new express.Router();

router.post("/api/js/signup", async (req, res) => {
    try {
      console.log(req.body);
      const { jsEmail } = req.body;
      console.log(jsEmail);
      const existingJobSeeker = await Js.findOne({ jsEmail });
  
      if (existingJobSeeker) {
        return res.status(400).json({ message: "Email already registered" });
      } else {
        const jobseeker = new Js(req.body);
        await jobseeker.save();
        res.status(201).json(jobseeker);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });




module.exports = router;