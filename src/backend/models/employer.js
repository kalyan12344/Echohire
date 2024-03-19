// Define your MongoDB schema and models here
const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: String,
    companyType: String,
    companyDescription: String,
    companyEmail: {
      type:String,
      required:true
  },
    companyPassword: String,
    companyLogo: String,
  });
  
  const Employer = mongoose.model("Employer", employerSchema);
  module.exports = Employer;