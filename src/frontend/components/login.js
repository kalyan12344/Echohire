// *** NANDHU ***
import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../styling/login.css";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  let loginCompanyData = null;
  let loginJsData = null;
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Successful login
        console.log("Login successful");
        console.log("User role:", response.data.role);

        if (response.data.role === "employer") {
          loginCompanyData = response.data.data;
          console.log(loginCompanyData);
          navigate("/employerboard", { state: { loginCompanyData } });
        } else if (response.data.role === "jobseeker") {
          loginJsData = response.data.data;
          navigate(`/jsboard`, { state: { loginJsData } });
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignup = () => {
    navigate(`/Signup`);
  };
  useEffect(() => {

    if (email.length === 0 || password.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image">
          <img
            style={{
              width: "350px",
              height: "400px",
              borderTopLeftRadius: "30px",
            }}
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-4735567-3985908.png?f=webp"
          />
        </div>
        <div className="login-form">
          <h2 className="title">Login</h2>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            value={email}
            sx={{ width: "250px" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            sx={{ width: "250px" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />{" "}
          <Button
            className="login-button"
            variant="contained"
            id="loginButton"
            sx={{ width: "250px", marginTop: "10px" }}
            onClick={handleLogin}
            disabled={isDisabled}
          >
            Login
          </Button>
          <div>
            <p>
              not a member?
              <button className="signup" onClick={handleSignup}>
                Signup
              </button>
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
