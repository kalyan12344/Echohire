const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    qualifications: String,
    skills: String,
    location: String,
    type: String,
    deadline: Date,
    salary: Number,
    companyName: String,
  });
  
  const Job = mongoose.model("Job", jobSchema);
  module.exports = Job;