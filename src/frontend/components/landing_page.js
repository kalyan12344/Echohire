import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent } from "@mui/material";
import "../styling/landing.css";
import { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/interview-experiences"
        );
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching interview experiences:", error);
        setError("Failed to fetch interview experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);
  return (
    <div>
      {/* Navbar */}
      <nav className="lnavbar">
        <div className="container">
          <div className="brand">
            <h1>
              Echo<span className="h">Hire</span>
            </h1>
          </div>
          <div className="links">
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "rgba(255, 0, 0, 0.75)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 1)",
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "rgba(255, 0, 0, 0.75)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 1)",
                  },
                }}
              >
                SignUp
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container">
        {/* Title and Image */}
        <section className="hero-section">
          <h2>Welcome to EchoHire</h2>
          <img
            src="https://img.freepik.com/free-vector/choice-worker-concept_23-2148626348.jpg?t=st=1714367185~exp=1714370785~hmac=f654a2a7231fe92cc14fe13e2905a599e96411831ac33ad33b3ab5c16297fdc5&w=740"
            alt="Company Logo"
          />
        </section>
        <section className="interview-experience-section">
          <h2>Interview Experiences</h2>
          {loading ? (
            <div>Loading experiences...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              {experiences.map((experience, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "300px",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "white",
                  }}
                >
                  <CardContent>
                    <h3>{experience.companyName}</h3>
                    <p>{experience.experience}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2024 EchoHire. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
