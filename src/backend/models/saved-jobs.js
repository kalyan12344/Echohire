const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
  jsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the Job model
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker", // Reference to the JobSeeker model
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedJob = mongoose.model("SavedJob", savedJobSchema);

module.exports = SavedJob;
