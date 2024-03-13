import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import "../styling/job-application.css";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
    resume: null,
    employmentHistory: "",
    education: "",
    skills: "",
    coverLetter: "",
    references: "",
    availability: "",
    termsAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code here to handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="job-application-form">
      <TextField
        label="Full Name"
        className="form-field"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        className="form-field"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        className="form-field"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <TextField
        label="Address"
        className="form-field"
        multiline
        rows={3}
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        label="Date of Birth"
        className="form-field"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
      <TextField
        label="Nationality"
        className="form-field"
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        name="resume"
        onChange={handleChange}
      />
      <TextField
        label="Employment History"
        className="form-field"
        multiline
        rows={3}
        name="employmentHistory"
        value={formData.employmentHistory}
        onChange={handleChange}
      />
      <TextField
        label="Education"
        className="form-field"
        multiline
        rows={3}
        name="education"
        value={formData.education}
        onChange={handleChange}
      />
      <TextField
        label="Skills"
        className="form-field"
        multiline
        rows={3}
        name="skills"
        value={formData.skills}
        onChange={handleChange}
      />
      <TextField
        label="Cover Letter"
        className="form-field"
        multiline
        rows={3}
        name="coverLetter"
        value={formData.coverLetter}
        onChange={handleChange}
      />
      <TextField
        label="References"
        className="form-field"
        multiline
        rows={3}
        name="references"
        value={formData.references}
        onChange={handleChange}
      />
      <TextField
        label="Availability"
        className="form-field"
        name="availability"
        value={formData.availability}
        onChange={handleChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.termsAgreed}
            onChange={handleChange}
            name="termsAgreed"
            color="primary"
          />
        }
        label="Agree to Terms and Conditions"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default JobApplicationForm;
