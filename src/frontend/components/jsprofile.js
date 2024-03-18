// **KALYAN **
import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import "../styling/jsprofile.css";
import { Button } from "@mui/material";

const JsProfile = ({ loginData, username }) => {
  const [skills, setSkills] = useState([]);
  console.log(loginData);
  const [newSkill, setNewSkill] = useState("");

  // Function to handle adding a new skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  // Function to handle deleting a skill
  const handleSkillDelete = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div className="profile" style={{ color: "white" }}>
      <div style={{ display: "flex" }}>
        <div className="personal-info">
          <h3 style={{ color: "red" }}>Personal Information</h3>
          <div>
            <span style={{ color: "grey" }}>Name: </span>
            {username}
          </div>
          <div>
            <span>Contact Info:</span> <br />
            <span>Email: </span> {loginData.jsEmail} <br></br>
            <span>Phone: </span> {loginData.jsEmail}
          </div>
          <div>
            {" "}
            <span>Address:</span> <br />
            <span>316 Bryan St, Denton, Texas, 76201.</span>
          </div>
        </div>
        <div className="skills-card">
          <h3 style={{ color: "red" }}>Skills</h3>
          <div className="add-skill">
            <input
              type="text"
              placeholder="Enter skill"
              value={newSkill}
              className="skill-textbox"
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button
              onClick={addSkill}
              style={{
                color: "white",
                backgroundColor: "rgba(255, 0, 0, 0.75)",
                fontSize: "0.5em",
                borderRadius: "20px",
              }}
            >
              Add
            </Button>
          </div>
          <div className="skill-pills" style={{ display: "flex" }}>
            {skills.map((skill, index) => (
              <div className="skill-pill" key={index}>
                <Chip
                  label={skill}
                  onDelete={() => handleSkillDelete(index)}
                  sx={{
                    backgroundColor: "#4d4d4d",
                    color: "white",
                    marginRight: "5px",
                    "&:hover .MuiChip-deleteIcon": {
                      visibility: "visible",
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="experience">
          <h4 style={{ color: "red" }}>Work Experience</h4>
        </div>
        <div className="projects"></div>
      </div>
    </div>
  );
};

export default JsProfile;

