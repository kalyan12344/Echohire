import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import "../styling/login.css";
import { Button } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleLogin = () => {
    console.log(email, password);
  };

  const handleEnter = (e) => {
    console.log(e);
  };
  useEffect(() => {
    console.log("Email:", email, "Password:", password);

    if (email.length === 0 || password.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);
  return (
    <div className="login-page">
      <div className="login-container">
        {" "}
        <h2 className="title">Login</h2>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          value={email}
          sx={{ width: "250px" }}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          value={password}
          sx={{ width: "250px" }}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(e.target.value);
          }}
        />{" "}
        <Button
          className="login-button"
          variant="contained"
          sx={{ width: "250px", marginTop: "10px" }}
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
        </Button>
        <div>
          <p>
            not a member?<button className="signup">Signup</button>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
