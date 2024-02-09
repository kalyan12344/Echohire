import React, { useState } from "react";
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
import { colorTransformations } from "@mui/material/Link/getTextDecoration";
import JobPostform from "./job-post";
import JobCardList from "./jobs";
import { Drawer } from "@mui/material";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EmployerProfile from "./employer-profile";
import CandidateList from "./employer-candidates";

const EmployerDashboard = () => {
  const [value, setValue] = useState(0);
  // const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <div>Dashboard</div>;
      case 1:
        return <JobCardList />;
      case 2:
        return (
          <div>
            <CandidateList />
          </div>
        );
      case 3:
        return <EmployerProfile />;
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
              label="Candidates"
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
              <JobPostform />
            </Box>
          </Drawer>
        </div>
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
};

export default EmployerDashboard;
