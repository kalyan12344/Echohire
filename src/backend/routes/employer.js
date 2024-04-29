// *** NANDHU **
const express = require("express");
const Employer = require("../models/employer");
const Js = require("../models/job_seeker");

const router = new express.Router();

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is an employer
    console.log(email, password);
    const employer = await Employer.findOne({ companyEmail: email });
    const jobSeeker = await Js.findOne({ jsEmail: email });

    if (!(employer || jobSeeker)) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(employer, jobSeeker);
    if (employer) {
      // Validate employer's password

      let isPasswordValid = password === employer.companyPassword;

      if (!isPasswordValid) {
        console.log(isPasswordValid);
        return res.status(400).json({ message: "Invalid email or password" });
      }
      console.log(res);
      return res.status(200).json({
        message: "Login successful",
        role: "employer",
        data: employer,
      });
    }

    // Check if the user is a job seeker
    if (jobSeeker) {
      // Validate job seeker's password
      let isPasswordValid = password === jobSeeker.jsPassword;
      console.log(isPasswordValid, "js");
      if (!isPasswordValid) {
        return res.status(400).json({
          message: "Invalid  password",
          error: "invalid password",
        });
      }
      return res.status(200).json({
        message: "Login successful",
        role: "jobseeker",
        data: jobSeeker,
      });
    }

    // If the user is not found in either table, return an error message
    return res.status(400).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/api/employer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find employer by ID in the database
    const employer = await Employer.findById(id);

    if (!employer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    // If employer found, return it in the response
    res.json(employer);
  } catch (error) {
    // Handle errors
    console.error("Error fetching employer details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// API Endpoint for Employer Signup - ***** HARSHIT ******
router.post("/api/employers/signup", async (req, res) => {
  try {
    console.log(req.body);

    const newEmployer = new Employer(req.body);
    await newEmployer.save();
    res.status(200).json(newEmployer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/api/employers/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check if a user with the provided email exists
    const user = await Employer.findOne({ companyEmail: email });

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = password === user.companyPassword;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password is valid, generate JWT token

    // Send the token to the client
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/api/employers/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run model validation before updating
    });

    if (!updatedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.json({
      message: "Employer details updated successfully",
      updatedEmployer,
    });
  } catch (error) {
    console.error("Error updating employer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
