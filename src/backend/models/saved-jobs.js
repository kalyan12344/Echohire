const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
  jsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobSeeker", // Reference to the Jobseeker model
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // Reference to the Job model
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

savedJobSchema.index({ jobId: 1, jsId: 1 }, { unique: true });

const SavedJob = mongoose.model("SavedJob", savedJobSchema);

module.exports = SavedJob;
