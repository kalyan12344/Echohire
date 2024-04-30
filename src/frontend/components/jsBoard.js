// Sujitha
import React, { useState, useEffect } from "react";
import { Button, TextField, Card, MenuItem, Menu } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import MenuIcon from "@mui/icons-material/Menu";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
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
  const [savedJobs, setSavedJobs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openHam = Boolean(anchorEl);
  const handleClickHam = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseHam = () => {
    setAnchorEl(null);
  };
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
  const [issue, setIssue] = useState({
    subject: "",
    issueDesc: "",
  });

  const [issueBoxOpen, setIssueBoxOpen] = useState(false);
  useEffect(() => {
    getJobs();
    getAppliedJobs();
    fetchSavedJobs();
  }, []);

  const closeIssueBox = () => {
    setIssueBoxOpen(false);
  };
  const openIssueBox = () => {
    setIssueBoxOpen(true);
  };
  const fetchSavedJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/saved-jobs/${loginJsData._id}`
      );

      if (response.status === 200) {
        console.log(response);
        setSavedJobs(response.data.savedJobs);
      } else {
        console.error("Failed to fetch saved jobs");
      }
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  };

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
  const raiseAnIssue = async () => {
    setIssueBoxOpen(false);
    const subject = issue.subject;
    const message = issue.issueDesc;
    console.log(issue);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/send-email",
        {
          subject,
          message,
        }
      );

      console.log("Email sent successfully:", response.data);
      // Handle success (e.g., display a success message to the user)
    } catch (error) {
      console.error("Error submitting contact form:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
    setIssue({ subject: "", issueDesc: "" });
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
        return (
          <JsDashboard
            username={username}
            appliedJobs={jobApplications}
            savedJobs={savedJobs}
          />
        );
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
            <MyApplications
              applications={jobApplications}
              loginJsData={loginJsData}
            />
          </div>
        );
      case 3:
        return <SavedJobs savedJobs={savedJobs} loginJsData={loginJsData} />;

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
          <div>
            {false ? (
              <CloseIcon
                onClick={handleCloseHam}
                sx={{ transform: "translateY(10px)" }}
                aria-controls={openHam ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openHam ? "true" : undefined}
              />
            ) : (
              <MenuIcon
                onClick={handleClickHam}
                sx={{ transform: "translateY(10px)" }}
                aria-controls={openHam ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openHam ? "true" : undefined}
              />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openHam}
            onClose={handleCloseHam}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "black",
                boxShadow: "rgba(0,0,0,0.25)",
              },
            }}
          >
            <MenuItem>
              <Button
                onClick={openIssueBox}
                variant="contained"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "rgba(255, 0, 0, 0.75)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 1)",
                  },
                }}
                style={{
                  color: "white",
                }}
              >
                RAISE AN ISSUE
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(255, 0, 0, 0.75)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 1)",
                  },
                  borderRadius: "30px",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </MenuItem>
          </Menu>
        </div>
      </div>
      {setIssueBoxOpen && (
        <Modal
          open={issueBoxOpen}
          onClose={closeIssueBox}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "500px",
              height: "300px",
              padding: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // backgroundColor: "#202020cc",
              // color: "white",
            }}
          >
            <h2>Raise an Issue</h2>
            <TextField
              value={issue.subject}
              onChange={(event) => {
                setIssue((prev) => ({
                  ...prev,
                  subject: event.target.value,
                }));
              }}
              placeholder="Issue Subject"
              sx={{
                marginBottom: "10px",
                width: "500px",
                color: "white",
              }}
            />{" "}
            <TextField
              multiline
              rows={4}
              value={issue.issueDesc}
              onChange={(event) => {
                setIssue((prev) => ({
                  ...prev,
                  issueDesc: event.target.value,
                }));
              }}
              placeholder="Issue description"
              sx={{ marginBottom: "10px", width: "500px", color: "white" }}
            />{" "}
            <Button
              onClick={raiseAnIssue}
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "rgba(0,0,0,0.75)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 1)",
                },
              }}
            >
              Submit
            </Button>
          </Card>
        </Modal>
      )}
      <div>{renderComponent()}</div>
    </div>
  );
};

export default JsBoard;
