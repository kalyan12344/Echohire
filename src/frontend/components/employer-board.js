// kalyan
import React, { useState, useEffect } from "react";
import { Button, TextField, Card, MenuItem, Menu } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import "../styling/employer-board.css";
import JobPostform from "./job-post";
import JobCardList from "./jobs";
import CloseIcon from "@mui/icons-material/Close";

import { Drawer } from "@mui/material";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EmployerProfile from "./employer-profile";
import CandidateList from "./employer-candidates";
import { useParams } from "react-router-dom";
import EmployerDashboard from "./employer-dashboard";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";

import { useLocation } from "react-router-dom";
import { TextArea } from "@buildo/bento-design-system";

const EmployerBoard = () => {
  const location = useLocation();
  const { loginCompanyData } = location.state;
  console.log(loginCompanyData);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const openHam = Boolean(anchorEl);
  const handleClickHam = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    navigate(`/`);
  };

  const handleCloseHam = () => {
    setAnchorEl(null);
  };
  // const { username } = useParams();
  // const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobData, setJobData] = useState([]);
  const [appJS, setAppJS] = useState([]);
  const [issue, setIssue] = useState({
    subject: "",
    issueDesc: "",
  });

  const [issueBoxOpen, setIssueBoxOpen] = useState(false);

  useEffect(() => {
    getJobs();
    getRecievedApplications();
  }, []);
  const closeIssueBox = () => {
    setIssueBoxOpen(false);
  };
  const openIssueBox = () => {
    setIssueBoxOpen(true);
  };
  const fetchJobSeekerData = async (jsID) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/jsdetails/${jsID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job seeker data for ID ${jsID}:`, error);
      return null;
    }
  };

  const getRecievedApplications = async () => {
    console.log(loginCompanyData?.companyName);
    try {
      const response = await axios.get(
        `http://localhost:5001/company/${loginCompanyData?.companyName}/jobforms`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Applications fetched successfully:", response.data);
        const applications = response.data;
        console.log(applications);
        const mergedApplications = await Promise.all(
          applications?.map(async (application) => {
            const jobSeekerData = await fetchJobSeekerData(application.jsId);
            console.log(jobSeekerData);
            const jsdetails = jobSeekerData;
            console.log(jsdetails);
            return { ...application, jsdetails: jsdetails[0] };
          })
        );
        // Process the merged applications data as needed
        setAppJS(mergedApplications);
        console.log(mergedApplications);
      } else {
        console.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  console.log(appJS);
  const getJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/jobs/${loginCompanyData.companyName}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setJobData(response.data.jobs);
        console.log("Jobs fetched successfully:", response.data);
        // Handle the fetched jobs data here
      } else {
        console.error("Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const handleJobPost = (newJob) => {
    setJobData([...jobData, newJob]);
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
    console.log(newValue);
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

  const renderComponent = () => {
    switch (value) {
      case 0:
        return (
          <EmployerDashboard
            loginCompanyData={loginCompanyData}
            jobs={jobData}
            recievedApplications={appJS}
          />
        );
      case 1:
        return (
          <JobCardList username={loginCompanyData.companyName} jobs={jobData} />
        );
      case 2:
        return (
          <div>
            <CandidateList
              applicationData={appJS}
              loginCompanyData={loginCompanyData}
            />
          </div>
        );
      case 3:
        return <EmployerProfile employerDetails={loginCompanyData} />;
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
              }}
              icon={<PeopleIcon />}
              label="Applications"
            />
            <Tab
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                color: "white",
              }}
              icon={<FolderSharedIcon />}
              label="Profile"
            />
          </Tabs>
          <Tab></Tab>
        </div>
        <div>
          <Button
            onClick={openDrawer}
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
            POST JOB
          </Button>
          <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
            <Box
              sx={{
                width: 600,
                padding: "20px",
                height: 1000,
                backgroundColor: "#1a1819",
              }}
            >
              <JobPostform
                username={loginCompanyData.companyName}
                onJobPost={handleJobPost}
              />
            </Box>
          </Drawer>
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

export default EmployerBoard;
