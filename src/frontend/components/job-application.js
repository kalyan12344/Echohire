// Bhanuja
import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import "../styling/job-application.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//this is for the Job application
const JobApplicationForm = ({}) => {
  const navigate = useNavigate();
  const { jsid, jobid } = useParams();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
    jsId: jsid,
    jobId: jobid,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : files ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5001/application/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Applied successfully to the job");
        navigate(`/employerboard`);
        // Redirect or show success message
      } else {
        console.error("Application failed");
        // Show error message
      }
    } catch (error) {
      console.error("Error applying to the job:", error);
      // Show error message
    }

    try {
      const response = await axios.get(
        `http://localhost:5001/api/js/email/${jsid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        console.log("job applied successfully");
        navigate(`/jsboard`);
      } else if (response.status === 409) {
        console.log("409");
        // Open Snackbar when status is 409
      } else {
        console.error("job application failed");
      }
      const loginJsData = response.data.js;
      console.log(loginJsData, "loginData");

      navigate(`/jsboard`, { state: { loginJsData } });
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        console.log("409");
      }
      // console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-application-form">
      <TextField
        label="First Name"
        className="form-field"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        className="form-field"
        name="lastname"
        value={formData.lastname}
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
