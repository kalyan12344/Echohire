import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "../styling/signup.css";
import Autocomplete from "@mui/material/Autocomplete";
import employerSignup from "../../assets/employer_signup.png";
import { Translate } from "@mui/icons-material";
import employer from "../../assets/employer.jpeg";
import js from "../../assets/job_seeker.jpeg";

const EmployerSignupForm = () => {
  const industries = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Finance" },
    { id: 3, name: "Healthcare" },
    { id: 4, name: "Education" },
    { id: 5, name: "Manufacturing" },
  ];
  return (
    <div className="employer-page">
      <div className="employer-sideimg"></div>
      <div className="employer-form">
        <TextField
          id="company-name"
          label="Company Name"
          variant="standard"
          //   value={
          sx={{ width: "230px" }}
        />
        <Autocomplete
          className="company-type"
          disablePortal
          id="company-type"
          options={industries.map((industry) => ({
            label: industry.name,
            value: industry.id,
          }))}
          sx={{ width: "330px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company Type"
              variant="standard"
              sx={{ width: "230px" }}
            />
          )}
        />
        <TextField
          id="description"
          label="Company Description"
          multiline
          rows={1}
          variant="standard"
          sx={{ width: "230px" }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          // value={email}
          sx={{ width: "230px" }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          // value={password}
          sx={{ width: "230px" }}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          type="password"
          // value={password}
          sx={{ width: "230px" }}
        />
        <Button
          className="employer-signup-button"
          variant="contained"
          sx={{ width: "250px", marginTop: "30px" }}
          // onClick={handleLogin}
          //   disabled={isDisabled}
        >
          Signup as Employer
        </Button>{" "}
      </div>
      <div className="employer-sideimg">
        <img
          src={employer}
          style={{
            width: "300px",
            height: "500px",
            borderBottomRightRadius: "30px",
          }}
        ></img>
      </div>
    </div>
  );
};
const JobSeekerSignupForm = () => (
  <div className="employer-page">
    <div className="employer-sideimg">
      <img
        src={js}
        style={{
          width: "300px",
          height: "400px",
          borderBottomRightRadius: "30px",
        }}
      ></img>
    </div>{" "}
    <div className="employer-form">
      <TextField
        id="js-name"
        label="First Name"
        variant="standard"
        //   value={
        sx={{ width: "230px" }}
      />
      <TextField
        id="js-name"
        label="Last Name"
        variant="standard"
        //   value={
        sx={{ width: "230px" }}
      />
      <TextField
        id="js-profession"
        label="Profession"
        variant="standard"
        sx={{ width: "230px" }}
      />
      <TextField
        id="standard-basic"
        label="Email"
        variant="standard"
        // value={email}
        sx={{ width: "230px" }}
      />
      <TextField
        id="standard-basic"
        label="Password"
        variant="standard"
        type="password"
        // value={password}
        sx={{ width: "230px" }}
      />
      <TextField
        id="standard-basic"
        label="Confirm Password"
        variant="standard"
        type="password"
        // value={password}
        sx={{ width: "230px" }}
      />
      <Button
        className="employer-signup-button"
        variant="contained"
        sx={{ width: "250px", marginTop: "30px" }}
        // onClick={handleLogin}
        //   disabled={isDisabled}
      >
        Signup as Job Seeker
      </Button>{" "}
    </div>
  </div>
);

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("employer");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = () => {
    if (activeTab === "employer") {
      // Code to submit employer form
      console.log("Submitting employer form");
    } else if (activeTab === "jobSeeker") {
      // Code to submit job seeker form
      console.log("Submitting job seeker form");
    }
  };

  return (
    <div className="signup-page">
      <div className="button-group">
        <button
          onClick={() => handleTabChange("employer")}
          className={`sliding-buttons ${
            activeTab === "employer" ? "active" : "inactive"
          }`}
          sx={{ color: "white" }}
        >
          Employer
        </button>
        <button
          className={`sliding-buttons ${
            activeTab === "jobSeeker" ? "active" : "inactive"
          }`}
          onClick={() => handleTabChange("jobSeeker")}
        >
          Job Seeker
        </button>
      </div>
      <div className="signup-container">
        {activeTab === "employer" ? (
          <EmployerSignupForm />
        ) : (
          <JobSeekerSignupForm />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
