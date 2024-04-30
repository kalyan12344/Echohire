const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobSeekerName: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

const InterviewExperience = mongoose.model(
  "InterviewExperience",
  interviewExperienceSchema
);
module.exports = InterviewExperience;
