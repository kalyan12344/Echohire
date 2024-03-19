import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "../styling/jsprofile.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const JsProfile = ({ loginData, username }) => {
  const [skills, setSkills] = useState([...loginData.skills]);
  const [workExp, setWorkExp] = useState([loginData.employment_history]);
  const [education, setEducation] = useState([loginData.education]);

  const [newSkill, setNewSkill] = useState("");
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [editedExp, setEditedExp] = useState(workExp);
  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [editedEdu, setEditedEdu] = useState(education);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({
    firstName: loginData.firstName,
    lastName: loginData.lastName,
    jsEmail: loginData.jsEmail,
    jsPhNo: loginData.jsPhNo,
    jsAddress: loginData.jsAddress,
  });

  const [isEditingImage, setIsEditingImage] = useState(false); // State variable for image editing

  const [imageSrc, setImageSrc] = useState(loginData.image);

  // Function to handle adding a new skill
  const addSkill = async () => {
    if (newSkill.trim() !== "") {
      // Update skills state in the frontend
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");

      try {
        const response = await axios.put(
          `http://localhost:5001/api/js/${loginData._id}/skills`,
          { skills: [...skills, newSkill] },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Skills updated successfully on the backend");
        } else {
          console.error("Failed to update skills on the backend");
        }
      } catch (error) {
        console.error("Error updating skills on the backend:", error);
      }
    }
  };

  // Function to handle deleting a skill
  const handleSkillDelete = async (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);

    try {
      await axios.put(`http://localhost:5001/api/js/${loginData._id}/skills`, {
        skills: updatedSkills,
      });
      console.log("Skill deleted successfully on the backend");
    } catch (error) {
      console.error("Failed to delete skill on the backend:", error);
    }
  };

  const handleWorkExpDoubleClick = () => {
    setIsEditingExp(true);
  };

  const handleEduDoubleClick = () => {
    setIsEditingEdu(true);
  };

  const handlePersonalInfoDoubleClick = () => {
    setIsEditingPersonalInfo(true);
  };

  const handleExpChange = (e) => {
    setEditedExp(e.target.value);
  };

  const handleEduChange = (e) => {
    setEditedEdu(e.target.value);
  };

  const handlePersonalInfoChange = (e, field) => {
    setEditedPersonalInfo({ ...editedPersonalInfo, [field]: e.target.value });
  };
  const handleImageDoubleClick = () => {
    setIsEditingImage(true);
  };

  // Function to handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleExpSave = async () => {
    setWorkExp(editedExp);
    setIsEditingExp(false);
    // Make an API call to update work experience on the backend
    try {
      const response = await axios.put(
        `http://localhost:5001/api/js/${loginData._id}/workexp`,
        { employement_history: editedExp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Work experience updated successfully on the backend");
      } else {
        console.error("Failed to update work experience on the backend");
      }
    } catch (error) {
      console.error("Error updating work experience on the backend:", error);
    }
  };

  const handleEduSave = async () => {
    setEducation(editedEdu);
    console.log(editedEdu);
    setIsEditingEdu(false);
    // Make an API call to update work experience on the backend
    try {
      const response = await axios.put(
        `http://localhost:5001/api/js/${loginData._id}/education`,
        { education: editedEdu },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("education updated successfully on the backend");
      } else {
        console.error("Failed to update education on the backend");
      }
    } catch (error) {
      console.error("Error updating education on the backend:", error);
    }
  };

  const handlePersonalInfoSave = async () => {
    setIsEditingPersonalInfo(false);

    try {
      const response = await axios.put(
        `http://localhost:5001/api/js/${loginData._id}/personal-details`,
        editedPersonalInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Personal Details updated successfully on the backend");
      } else {
        console.error("Failed to update personal details on the backend");
      }
    } catch (error) {
      console.error("Error updating personal details on the backend:", error);
    }
  };

  return (
    <div className="profile" style={{ color: "white" }}>
      <div className="pro-img" onDoubleClick={handleImageDoubleClick}>
        {" "}
        {isEditingImage ? (
          <input type="file" onChange={handleImageChange} accept="image/*" />
        ) : (
          <img
            src={imageSrc}
            alt="Profile Image"
            style={{ maxWidth: "200px" }}
          />
        )}{" "}
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="personal-info"
          onDoubleClick={handlePersonalInfoDoubleClick}
        >
          <h3 style={{ color: "red" }}>Personal Information</h3>
          {isEditingPersonalInfo ? (
            <div>
              <div>
                <span>Name: </span>
                <input
                  type="text"
                  value={editedPersonalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange(e, "firstName")}
                />
                <input
                  type="text"
                  value={editedPersonalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange(e, "lastName")}
                />
              </div>
              <div>
                <span>Email: </span>
                <input
                  type="email"
                  value={editedPersonalInfo.jsEmail}
                  onChange={(e) => handlePersonalInfoChange(e, "jsEmail")}
                />
              </div>
              <div>
                <span>Phone: </span>
                <input
                  type="text"
                  value={editedPersonalInfo.jsPhNo}
                  onChange={(e) => handlePersonalInfoChange(e, "jsPhNo")}
                />
              </div>
              <div>
                {" "}
                <span>Address:</span>
                <input
                  type="text"
                  value={editedPersonalInfo.jsAddress}
                  onChange={(e) => handlePersonalInfoChange(e, "jsAddress")}
                />
              </div>
              <button onClick={handlePersonalInfoSave}>Save</button>
            </div>
          ) : (
            <div>
              <div>
                <span>Name: </span>
                {editedPersonalInfo.firstName +
                  " " +
                  editedPersonalInfo.lastName}
              </div>
              <div>
                <span>Email: </span> {editedPersonalInfo.jsEmail} <br />
                <span>Phone: </span> {editedPersonalInfo.jsPhNo}
              </div>
              <div>
                {" "}
                <span>Address:</span>
                <span>{editedPersonalInfo.jsAddress}</span>
              </div>
            </div>
          )}
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

      <div style={{ display: "flex" }}>
        <div className="experience" onDoubleClick={handleWorkExpDoubleClick}>
          <h4 style={{ color: "red" }}>Work Experience</h4>
          {isEditingExp ? (
            <TextField
              value={editedExp}
              onChange={handleExpChange}
              onBlur={handleExpSave}
              autoFocus
              fullWidth
              multiline
            />
          ) : (
            <div>{workExp}</div>
          )}
        </div>
        <div className="education" onDoubleClick={handleEduDoubleClick}>
          <h4 style={{ color: "red" }}>education</h4>
          {isEditingEdu ? (
            <TextField
              value={editedEdu}
              onChange={handleEduChange}
              onBlur={handleEduSave}
              autoFocus
              fullWidth
              multiline
            />
          ) : (
            <div className="edu">{education}</div>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default JsProfile;
