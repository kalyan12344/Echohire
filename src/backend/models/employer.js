const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    unique: true,
    required: true,
  },
  companyType: String,
  companyDescription: String,
  companyEmail: {
    type: String,
    unique: true,
    required: true,
  },
  companyPassword: String,
  companyLogo: String,
});

const Employer = mongoose.model("Employer", employerSchema);
module.exports = Employer;
