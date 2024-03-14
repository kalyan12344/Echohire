const mongoose = require('mongoose');

//js signup

const jsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    profession: String,
    jsEmail: String,
    jsPassword: String,
    // companyLogo: String,
  });
  const Js = mongoose.model("JobSeeker", jsSchema);
  module.exports = Js;