// ***** HARSHIT****
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styling/signup.css";
import Autocomplete from "@mui/material/Autocomplete";
import employer from "../../assets/employer.jpeg";
import js from "../../assets/job_seeker.jpeg";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

const EmployerSignupForm = () => {
  const navigate = useNavigate();
  const industries = [
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
    companyLogo: null,
    signupType: "employer",
  });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const handleEmployerEmailDomainCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(employerDetails.companyEmail);
    setIsValidEmail(isValid);
    const domain = employerDetails?.companyEmail?.match(/@(.+)/)[1];
    console.log(domain);

    if (domain && isValid) {
      try {
        const response = await axios.get(
          `http://localhost:5001/verify-domain`,
          {
            params: {
              domain: domain,
            },
          }
        );
        console.log(response.data.success); // Log the domain information to the console
        // Handle the domain verification response as needed
      } catch (error) {
        console.error("Error verifying domain:", error);
        // Handle error if API call fails
      }
    }
  };
  const validateEmail = () => {
    // Regular expression for basic email validation
  };
  const handleLogoChange = (event) => {
    console.log(event);
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
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

  const handleEmployerSignUP = async () => {
    console.log(employerDetails);
    if (isPasswordSame) {
      setEmployerDetails({
        ...employerDetails,
        companyPassword: confirmPassword,
      });
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/employers/signup",
        employerDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Employer signed up successfully");
      } else {
        console.error("Failed to sign up employer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="employer-page">
      {/* <div className="employer-sideimg"></div> */}
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
          sx={{
            width: "200px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
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
          sx={{
            width: "330px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company Type"
              variant="standard"
              sx={{ width: "200px", transform: "translateX(-50px)" }}
            />
          )}
        />
        <TextField
          id="description"
          label="Company Description"
          multiline
          rows={1}
          variant="standard"
          sx={{
            width: "200px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
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
          onBlur={handleEmployerEmailDomainCheck}
          sx={{
            width: "200px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          value={employerDetails.companyEmail}
          // onBlur={validateEmail}
          error={!isValidEmail}
          helperText={!isValidEmail ? "Invalid email address" : ""}
          onChange={(e) => {
            // console.log(e.toLowerCase());
            setEmployerDetails({
              ...employerDetails,
              companyEmail: e.target.value.toLowerCase(),
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
          sx={{
            width: "200px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
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
          sx={{
            width: "200px",
            marginRight: "20px",
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
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
        {/* <Button variant="contained" sx={{ backgroundColor: "red" }}>
          <input accept="image/*" type="file" onChange={handleLogoChange} />
          Choose File
        </Button>
        {employerDetails.companyLogo ? (
          <img height={100} src={employerDetails.companyLogo} />
        ) : (
          ""
        )} */}
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
          <p style={{ color: "white" }}>
            already a member?
            <Button
              variant="contained"
              sx={{
                color: "white",
                marginLeft: "10px",
                fontSize: "0.7em",
                backgroundColor: "rgba(255,0,0,0.75)",
                borderRadius: "20px",
                padding: "5px",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </p>
        </div>{" "}
      </div>
      {/* <div className="employer-sideimg">
        <img
          src={employer}
          style={{
            width: "300px",
            height: "500px",
            borderBottomRightRadius: "30px",
          }}
        ></img>
      </div> */}
    </div>
  );
};
// **** PAVAN ***
const JobSeekerSignupForm = () => {
  const navigate = useNavigate();

  const [jsDetails, setJSDetails] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    jsPhNo: "",
    jsAddress: "",
    jsEmail: "",
    jsPassword: "",
    nationality: "",
    resume: "",
    dob: "",
    employement_history: "",
    education: "",
    skills: [],
    cover_letter: "",
    references: "",
    image: "",

    signupType: "js",
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

  const handleJSSignUP = async () => {
    if (isPasswordSame) {
      // Update the jsDetails state
      setJSDetails({ ...jsDetails, jsPassword: confirmPassword });
    }
  };

  // useEffect to trigger API call when jsDetails changes
  useEffect(() => {
    // Check if password is not empty and other necessary conditions
    if (isPasswordSame && jsDetails.jsPassword !== "") {
      try {
        axios
          .post("http://localhost:5001/api/js/signup", jsDetails, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("js signed up successfully");
              navigate("/Tick");
            } else {
              console.error("Failed to sign up js");
            }
          })
          .catch((error) => {
            console.error("Error signing up job seeker:", error);
          });
      } catch (error) {
        console.error("Error signing up job seeker:", error);
      }
    }
  }, [jsDetails, isPasswordSame]);
  return (
    <div className="employer-page">
      {/* <div className="employer-sideimg">
        <img
          src={js}
          style={{
            width: "300px",
            height: "400px",
            borderBottomRightRadius: "30px",
          }}
        ></img> */}
      {/* </div>{" "} */}
      <div className="employer-form">
        <div>
          <TextField
            id="js-name"
            label="First Name"
            variant="standard"
            value={jsDetails.firstName}
            sx={{
              width: "200px",
              marginRight: "20px",

              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
            onChange={(e) => {
              setJSDetails({
                ...jsDetails,
                firstName: e.target.value,
              });
            }}
          />
          <TextField
            id="js-name"
            label="Last Name"
            variant="standard"
            value={jsDetails.lastName}
            sx={{
              width: "200px",

              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
            onChange={(e) => {
              setJSDetails({
                ...jsDetails,
                lastName: e.target.value,
              });
            }}
          />
        </div>
        <TextField
          id="js-profession"
          label="Profession"
          variant="standard"
          sx={{
            width: "200px",

            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          value={jsDetails.profession}
          onChange={(e) => {
            setJSDetails({
              ...jsDetails,
              profession: e.target.value,
            });
          }}
        />
        <TextField
          id="js-phno"
          label="Mobile Number"
          variant="standard"
          sx={{
            width: "200px",

            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          value={jsDetails.jsPhNo}
          onChange={(e) => {
            setJSDetails({
              ...jsDetails,
              jsPhNo: e.target.value,
            });
          }}
        />
        <TextField
          id="js-address"
          label="Address"
          variant="standard"
          sx={{
            width: "200px",

            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          value={jsDetails.jsAddress}
          onChange={(e) => {
            setJSDetails({
              ...jsDetails,
              jsAddress: e.target.value,
            });
          }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          sx={{
            width: "200px",

            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInput-underline:before": { borderBottomColor: "white" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": { borderBottomColor: "white" },
          }}
          value={jsDetails.jsEmail}
          onBlur={validateEmail}
          error={!isValidEmail}
          helperText={!isValidEmail ? "Invalid email address" : ""}
          onChange={(e) => {
            console.log(jsDetails.jsEmail.toLowerCase());

            setJSDetails({
              ...jsDetails,
              jsEmail: e.target.value,
            });
          }}
        />
        <div>
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
            sx={{
              width: "200px",
              marginRight: "20px",
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
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
            sx={{
              width: "200px",

              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
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
        </div>
        <Button
          className="employer-signup-button"
          variant="contained"
          sx={{ width: "250px", marginTop: "30px" }}
          onClick={handleJSSignUP}
          disabled={false}
        >
          Signup as Job Seeker
        </Button>{" "}
        <div>
          <p style={{ color: "white" }}>
            already a member?
            <Button
              sx={{
                color: "white",
                marginLeft: "10px",
                fontSize: "0.7em",
                backgroundColor: "rgba(255,0,0,0.75)",
                borderRadius: "20px",
                padding: "5px",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};
// HARSHIT
const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("employer");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="signup-page">
      <div className="button-group">
        <button
          variant="contained"
          sx={{
            backgroundColor: "rgba(255, 0, 0, 0.75)",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 1)",
            },
          }}
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
