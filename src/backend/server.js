const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://echohire:keerkalK9@Cluster0.qcm3afu.mongodb.net/?retryWrites=true&w=majority"
);

// Define your MongoDB schema and models here

const employerSchema = new mongoose.Schema({
  companyName: String,
  companyType: String,
  companyDescription: String,
  companyEmail: String,
  companyPassword: String,
});

const Employer = mongoose.model("Employer", employerSchema);

// API Endpoint for Employer Signup
app.post("/api/employers/signup", async (req, res) => {
  try {
    const newEmployer = new Employer(req.body);
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
