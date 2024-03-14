const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require('./database');
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5001;


// Define your MongoDB schema and models here

// const employerSchema = new mongoose.Schema({
//   companyName: String,
//   companyType: String,
//   companyDescription: String,
//   companyEmail: String,
//   companyPassword: String,
//   companyLogo: String,
// });

// const Employer = mongoose.model("Employer", employerSchema);


// // API Endpoint for Employer Signup
// app.post("/api/employers/signup", async (req, res) => {
//   try {
//     console.log(req.body);

//     const newEmployer = new Employer(req.body);
//     await newEmployer.save();
//     res.status(201).json(newEmployer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //js signup

// const jsSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   profession: String,
//   jsEmail: String,
//   jsPassword: String,
//   // companyLogo: String,
// });
// const Js = mongoose.model("JobSeeker", jsSchema);

// app.post("/api/js/signup", async (req, res) => {
//   try {
//     console.log(req.body);
//     const { jsEmail } = req.body;
//     console.log(jsEmail);
//     const existingJobSeeker = await Js.findOne({ jsEmail });

//     if (existingJobSeeker) {
//       return res.status(400).json({ message: "Email already registered" });
//     } else {
//       const jobseeker = new Js(req.body);
//       await jobseeker.save();
//       res.status(201).json(jobseeker);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the user is an employer
//     console.log(email, password);
//     const employer = await Employer.findOne({ companyEmail: email });
//     const jobSeeker = await Js.findOne({ jsEmail: email });

//     console.log(employer, jobSeeker);
//     if (employer) {
//       // Validate employer's password

//       let isPasswordValid = password === employer.companyPassword;

//       if (!isPasswordValid) {
//         console.log(isPasswordValid);
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
//       console.log(res);
//       return res.status(200).json({
//         message: "Login successful",
//         role: "employer",
//         data: employer,
//       });
//     }

//     // Check if the user is a job seeker
//     if (jobSeeker) {
//       // Validate job seeker's password
//       let isPasswordValid = password === jobSeeker.jsPassword;
//       console.log(isPasswordValid);
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
//       return res.status(200).json({
//         message: "Login successful",
//         role: "jobseeker",
//         data: jobSeeker,
//       });
//     }

//     // If the user is not found in either table, return an error message
//     return res.status(400).json({ message: "Invalid email or password" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.post("/api/employers/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);

//   try {
//     // Check if a user with the provided email exists
//     const user = await Employer.findOne({ companyEmail: email });

//     console.log(user);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Compare passwords
//     const isPasswordValid = password === user.companyPassword;

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Password is valid, generate JWT token

//     // Send the token to the client
//     res.status(200).json({ user: user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// //////JOBPOSTINGGGGGGGGGGGGGG

// const jobSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   qualifications: String,
//   skills: String,
//   location: String,
//   type: String,
//   deadline: Date,
//   salary: Number,
//   companyName: String,
// });

// const Job = mongoose.model("Job", jobSchema);

// // Middleware for parsing JSON
// app.use(bodyParser.json());

// // API Endpoint for posting a job
// app.post("/api/jobpost", async (req, res) => {
//   try {
//     // Extract job data from request body
//     console.log(req.body);
//     const {
//       title,
//       description,
//       qualifications,
//       skills,
//       location,
//       type,
//       deadline,
//       salary,
//       companyName,
//     } = req.body;

//     // Create a new job instance
//     const newJob = new Job({
//       title,
//       description,
//       qualifications,
//       skills,
//       location,
//       type,
//       deadline,
//       salary,
//       companyName,
//     });
//     console.log(newJob);
//     // Save the job to the database
//     await newJob.save();

//     // Send a success response
//     res.status(201).json({ message: "Job posted successfully", job: newJob });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/jobs/:companyName", async (req, res) => {
//   try {
//     // Extract the company name from the request parameters
//     const { companyName } = req.params;
//     console.log(companyName);
//     // Query the database for jobs associated with the given company name
//     const jobs = await Job.find({ companyName: companyName });

//     // Send the retrieved jobs as a response
//     res.status(200).json({ jobs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// //jobs for js
// app.get("/api/jsjobs", async (req, res) => {
//   try {
//     const jobs = await Job.find();

//     // Send the retrieved jobs as a response
//     res.status(200).json({ jobs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // job applications

// const jobapplicationschema = new mongoose.Schema({
//   title: String,
//   description: String,
//   qualifications: String,
//   skills: String,
//   location: String,
//   type: String,
//   deadline: Date,
//   salary: Number,
//   companyName: String,
//   jsID: String,
//   jobID: String,
//   status: String,
// });

// const application = mongoose.model("Job Applications", jobapplicationschema);

// app.post("/api/jobapplication", async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       qualifications,
//       skills,
//       location,
//       type,
//       deadline,
//       salary,
//       companyName,
//       jobID,
//       jsID,
//       status,
//     } = req.body;

//     const existingApplication = await application.findOne({ jobID, jsID });

//     if (existingApplication) {
//       console.log("409");
//       return res.status(409).json({ error: "Job application already exists" });
//     }

//     const newApplication = new application({
//       title,
//       description,
//       qualifications,
//       skills,
//       location,
//       type,
//       deadline,
//       salary,
//       companyName,
//       jsID,
//       jobID,
//       status: "Applied",
//     });

//     // Save the job application to the database
//     await newApplication.save();

//     // Send a success response
//     res.status(201).json({ message: "Job applied successfully" });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/applications/:jsID", async (req, res) => {
//   try {
//     // Extract the company name from the request parameters
//     const { jsID } = req.params;
//     console.log(jsID);
//     // Query the database for jobs associated with the given company name
//     const applications = await application.find({ jsID: jsID });

//     // Send the retrieved jobs as a response
//     res.status(200).json({ applications });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Routes
const employerRouter = require('./routes/employer');
const jobApplicationRouter=require('./routes/job_application');
const jobSeekerRouter=require('./routes/job_seeker');
const jobRouter=require('./routes/jobs');
app.use(employerRouter);
app.use(jobApplicationRouter);
app.use(jobSeekerRouter);
app.use(jobRouter);