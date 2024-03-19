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

router.get("/api/js/email/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const js = await Js.findOne({ _id: id });
    console.log(js);
    const email = js.jsEmail;
    const password = js.jsPassword;
    res.status(200).json({ js });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update personal details
router.put("/api/js/:id/personal-details", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, jsEmail, jsPhNo, jsAddress } = req.body;
  console.log(req.body);

  try {
    const updatedPersonalDetails = await Js.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        jsEmail,
        jsPhNo,
        jsAddress,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Personal details updated successfully",
      updatedPersonalDetails,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating personal details",
      errorMessage: error.message,
    });
  }
});

router.put("/api/js/:id/skills", async (req, res) => {
  const { id } = req.params;
  const { skills } = req.body;
  console.log(req.body);

  try {
    const updatedSkills = await Js.findByIdAndUpdate(
      id,
      {
        skills,
      },
      { new: true }
    );

    res.status(200).json({
      message: "skills updated successfully",
      updatedSkills,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating SKILLS",
      errorMessage: error.message,
    });
  }
});

router.put("/api/js/:id/education", async (req, res) => {
  const { id } = req.params;
  const { education } = req.body;
  console.log(req.body);

  try {
    const updatedEducation = await Js.findByIdAndUpdate(
      id,
      {
        education,
      },
      { new: true }
    );

    res.status(200).json({
      message: "education updated successfully",
      updatedSkills,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating education",
      errorMessage: error.message,
    });
  }
});

router.put("/api/js/:id/workexp", async (req, res) => {
  const { id } = req.params;
  const { employement_history } = req.body;
  console.log(employement_history);

  try {
    const updatedWorkExp = await Js.findByIdAndUpdate(
      id,
      {
        employement_history,
      },
      { new: true }
    );
    console.log(updatedWorkExp);
    res.status(200).json({
      message: "WE updated successfully",
      updatedWorkExp,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating WE",
      errorMessage: error.message,
    });
  }
});

router.put("/api/js/:id/image", async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;
  console.log(image);

  try {
    const updatedImage = await Js.findByIdAndUpdate(
      id,
      {
        image,
      },
      { new: true }
    );
    console.log(updatedImage);
    res.status(200).json({
      message: "image updated successfully",
      updatedImage,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error updating image",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
