// Sujitha
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import "../styling/employer-board.css";

import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useLocation } from "react-router-dom";
import JobCardListJS from "./jsJobs";
import JsDashboard from "./jsDashboard";
import MyApplications from "./myapplications";
import JsProfile from "./jsprofile";
import SavedJobs from "./jsSaved";

const JsBoard = () => {
  const location = useLocation();
  const { loginJsData } = location.state;
  console.log(loginJsData);
  const jsid = loginJsData._id;
  // console.log(loginJsData._id)
  let username = loginJsData.firstName + " " + loginJsData.lastName;
  username = username.toUpperCase();
  const [value, setValue] = useState(() => {
    // Get the selected tab index from local storage or default to 0 (Dashboard) if not found
    return parseInt(localStorage.getItem("selectedTabIndex")) || 0;
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  useEffect(() => {
    getJobs();
    getAppliedJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/jsjobs`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setJobData(response.data.jobs);
        console.log("Jobs Applied :", response.data);
        // Handle the fetched jobs data here
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const getAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/applications/${loginJsData._id}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        console.log("Jobs fetched successfully:", response.data.applications);
        setJobApplications(response.data.applications);
        // Handle the fetched jobs data here
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleJobApply = (newJobApplication) => {
    const updatedApplications = new Set([
      ...jobApplications,
      newJobApplication,
    ]);

    setJobApplications([...updatedApplications]);
  };

  const navigate = useNavigate();

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTabIndex", newValue); // Save selected tab index to local storage
    console.log(newValue);
  };

  const handleLogout = () => {
    navigate(`/`);
  };

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <JsDashboard username={username} />;
      case 1:
        return (
          <JobCardListJS
            jobs={jobData}
            loginData={loginJsData}
            onJobApply={handleJobApply}
          />
        );
      case 2:
        return (
          <div>
            <MyApplications applications={jobApplications} />
          </div>
        );
      case 3:
        return <SavedJobs loginData={loginJsData} />;

      case 4:
        return <JsProfile loginData={loginJsData} username={username} />;

      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="navbar"
        style={{ paddingTop: "20px", marginRight: " 20px" }}
      >
        <div className="comp-title">
          <h4>
            Echo<span className="h">Hire</span>
          </h4>
        </div>
        <div className="menu">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label=""
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "rgba(255, 0, 0, 0.75)",
              },
            }}
          >
            <Tab
              sx={{
                // indicatorSx: {
                //   backgroundColor: "red",
                // },
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                fontSize: "10px",
              }}
              style={{
                color: "white",
              }}
              icon={<DashboardIcon />}
              label="Dashboard"
            />
            <Tab
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                color: "white",
                fontSize: "10px",
              }}
              icon={<WorkIcon />}
              label="Jobs"
            />
            <Tab
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                color: "white",
                fontSize: "10px",
              }}
              icon={<PeopleIcon />}
              label="my applications"
            />

            <Tab
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                color: "white",
                fontSize: "10px",
              }}
              icon={<BookmarkRoundedIcon />}
              label="Saved Jobs"
            />
            <Tab
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                color: "white",
                fontSize: "10px",
              }}
              icon={<FolderSharedIcon />}
              label="Profile"
            />
          </Tabs>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgba(255, 0, 0, 0.75)",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 1)",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
};

export default JsBoard;
