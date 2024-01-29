import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styling/signup.css";
import Autocomplete from "@mui/material/Autocomplete";
import employerSignup from "../../assets/employer_signup.png";
import employer from "../../assets/employer.jpeg";
import js from "../../assets/job_seeker.jpeg";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const EmployerSignupForm = () => {
  const navigate = useNavigate();
  const industries = [
    // { label: "Technology", value: "Technology" },
    // { label: "Finance", value: "Finance" },
    // { label: "Healthcare", value: "Healthcare" },
    // { label: "Education", value: "Education" },
    // { label: "Manufacturing", value: "Manufacturing" },
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
  ];

  const [employerDetails, setEmployerDetails] = useState({
    companyName: "",
    companyType: "",
    companyDescription: "",
    companyEmail: "",
    companyPassword: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const validateEmail = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(employerDetails.companyEmail);
    setIsValidEmail(isValid);
  };

  const validatePassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    const isValid =
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit;

    setIsValidPassword(isValid);
  };

  const samePassword = () => {
    if (password === confirmPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };

  const handleLogin = () => {
    navigate(`/`);
  };

  const handleEmployerSignUP = () => {
    console.log(employerDetails);
  };

  return (
    <div className="employer-page">
      <div className="employer-sideimg"></div>
      <div className="employer-form">
        <TextField
          id="company-name"
          label="Company Name"
          variant="standard"
          value={employerDetails.companyName}
          onChange={(e) => {
            setEmployerDetails({
              ...employerDetails,
              companyName: e.target.value,
            });
          }}
          sx={{ width: "230px" }}
        />
        <Autocomplete
          className="company-type"
          id="company-type"
          options={industries}
          value={employerDetails.companyType}
          onChange={(event, newValue) => {
            console.log("Input changed:", newValue);
            setEmployerDetails({
              ...employerDetails,
              companyType: newValue,
            });
          }}
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
          value={employerDetails.companyDescription}
          onChange={(e) => {
            setEmployerDetails({
              ...employerDetails,
              companyDescription: e.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          sx={{ width: "230px" }}
          value={employerDetails.companyEmail}
          onBlur={validateEmail}
          error={!isValidEmail}
          helperText={!isValidEmail ? "Invalid email address" : ""}
          onChange={(e) => {
            setEmployerDetails({
              ...employerDetails,
              companyEmail: e.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type={showPassword ? "text" : "password"}
          value={password}
          onBlur={validatePassword}
          onChange={(e) => setPassword(e.target.value)}
          error={!isValidPassword}
          helperText={
            !isValidPassword
              ? "> 8 characters long, 1 uppercase,1 lowercase, 1 digit."
              : ""
          }
          sx={{ width: "230px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          onBlur={samePassword}
          error={!isPasswordSame}
          helperText={!isPasswordSame ? "Passwords does not match" : ""}
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "230px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showConfirmPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowConfirmPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowConfirmPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="employer-signup-button"
          variant="contained"
          sx={{ width: "250px", marginTop: "30px" }}
          onClick={handleEmployerSignUP}
          //   disabled={isDisabled}
        >
          Signup as Employer
        </Button>{" "}
        <div>
          <p>
            already a member?
            <button className="login" onClick={handleLogin}>
              Login
            </button>
          </p>
        </div>{" "}
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

const JobSeekerSignupForm = () => {
  const navigate = useNavigate();

  const [jsDetails, setJSDetails] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    jsEmail: "",
    jsPassword: "",
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(jsDetails.jsEmail);
    setIsValidEmail(isValid);
  };

  const validatePassword = () => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);

    const isValid =
      password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit;

    setIsValidPassword(isValid);
  };

  const samePassword = () => {
    if (password === confirmPassword) {
      setIsPasswordSame(true);
    } else {
      setIsPasswordSame(false);
    }
  };
  const handleLogin = () => {
    navigate(`/`);
  };

  const handleJSSignUP = () => {
    console.log(jsDetails);
  };
  return (
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
          sx={{ width: "230px" }}
          value={jsDetails.jsEmail}
          onBlur={validateEmail}
          error={!isValidEmail}
          helperText={!isValidEmail ? "Invalid email address" : ""}
          onChange={(e) => {
            setJSDetails({
              ...jsDetails,
              jsEmail: e.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type={showPassword ? "text" : "password"}
          value={password}
          onBlur={validatePassword}
          onChange={(e) => setPassword(e.target.value)}
          error={!isValidPassword}
          helperText={
            !isValidPassword
              ? "> 8 characters long, 1 uppercase,1 lowercase, 1 digit."
              : ""
          }
          sx={{ width: "230px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="standard-basic"
          label="Confirm Password"
          variant="standard"
          onBlur={samePassword}
          error={!isPasswordSame}
          helperText={!isPasswordSame ? "Passwords does not match" : ""}
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "230px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showConfirmPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowConfirmPassword(false)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowConfirmPassword(true)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="employer-signup-button"
          variant="contained"
          sx={{ width: "250px", marginTop: "30px" }}
          onClick={handleJSSignUP}
          disabled={
            // jsDetails.firstName != "" &&
            // jsDetails.lastName.length > 0 &&
            // jsDetails.profession.length > 0 &&
            // isValidEmail &&
            // isValidPassword &&
            // isPasswordSame
            true
          }
        >
          Signup as Job Seeker
        </Button>{" "}
        <div>
          <p>
            already a member?
            <button className="login" onClick={handleLogin}>
              Login
            </button>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

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
