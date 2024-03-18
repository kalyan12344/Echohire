const express = require("express");
const Js = require("../models/job_seeker");
const router = new express.Router();
//js signup

// const jsSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   profession: String,
//   jsEmail: String,
//   jsPassword: String,
//   jsPhno: String,
//   jsAddress: String,
// });
// const Js = mongoose.model("JobSeeker", jsSchema);

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

router.get("/api/jsdetails/:jsID", async (req, res) => {
  try {
    // Extract the company name from the request parameters
    const { jsID } = req.params;
    console.log(jsID);
    // Query the database for jobs associated with the given company name
    const jsdetails = await Js.find({ _id: jsID });

    // Send the retrieved jobs as a response
    res.status(200).json({ jsdetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
