const mongoose = require('mongoose');

//js signup

const jsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jsEmail: {
      type:String,
      required:true
  },
    jsPassword: String,
    profession: String,
    address:String,
    phone_number:String,
    nationality:String,
    resume:String,
    dob:Date,
    employement_history:String,
    education:String,
    skills:String,
    cover_letter:String,
    references:String,
    image:String
  });
  const Js = mongoose.model("JobSeeker", jsSchema);
  module.exports = Js;