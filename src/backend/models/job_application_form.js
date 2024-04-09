const mongoose = require('mongoose');

//Application Form

const ApplicationFormSchema = new mongoose.Schema({
    firstname: String,
    lastname:String,
    email: String,
    phone: String,
    address: String,
    dateOfBirth: Date,
    nationality: String,
    resume: {
        data: Buffer,
        contentType: String
      },
    employmentHistory: String,
    education: String,
    skills: String,
    coverLetter: String,
    references: String,
    availability: String,
    termsAgreed: Boolean,
    jsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker',
      },
      jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
      status:{
        type: String,
      default: 'Not Applied',
      enum: ['Not Applied', 'Applied','Reviewed','Interview-scheduled','Hired','Rejected'],
      }
  });
  const ApplicationForm = mongoose.model("ApplicationForm", ApplicationFormSchema);
  module.exports = ApplicationForm;