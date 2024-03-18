// **** PAVAN ****
const express = require('express');
const Js = require('../models/job_seeker');
const router = new express.Router();
const axios = require('axios');

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
        res.status(200).json(jobseeker);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/api/js/email/:id", async (req, res) => {
    try {
      const id=req.params.id
      console.log(id)
      const js = await Js.findOne({_id:id});
      console.log(js)
      const email=js.jsEmail;
      const password=js.jsPassword;
      res.status(200).json( {js });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });




module.exports = router;