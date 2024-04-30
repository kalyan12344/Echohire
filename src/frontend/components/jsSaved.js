// ** vyjayanthi **
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Drawer,
  Box,
} from "@mui/material";
import "../styling/jobs.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";
import EditedJobPostform from "./post-edited-job";
import axios from "axios";
import { color } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { set } from "mongoose";

const ITEMS_PER_PAGE = 4;

const JobCardJS = ({ jobData, loginData, onJobApply }) => {
  const [open, setOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Card
      className="job-card "
      style={{
        backgroundColor: "#202020cc",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
            {jobData.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "white" }}>
            Location: {jobData.location}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Type: {jobData.type}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Deadline: {jobData.deadline}
          </Typography>
        </CardContent>
      </div>
      <div>
        {" "}
        <Snackbar
          open={open}
          sx={{ width: "30px" }}
          autoHideDuration={2000}
          severity="success"
          onClose={handleClose}
          message="You have already for this job"
          action={action}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "30px",
          justifyContent: "space-around",
          marginRight: "10px",
        }}
      >
        {/* <Button variant="contained" onClick={handleApply}>
          Save
        </Button>
        <Button variant="contained" onClick={handleApply}>
          Apply
        </Button> */}
      </div>
    </Card>
  );
};

const SavedJobs = ({ loginJsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    fetchSavedJobs();
  });
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(savedJobs.length / ITEMS_PER_PAGE);
  const paginatedData = savedJobs.slice(offset, offset + ITEMS_PER_PAGE);
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
  return (
    <div className="rend-comp-parent">
      <div className="left-panel">
        {/* <div className="filter-panel"> */}
        {/* <p>Filters</p> */}
        {/* </div> */}
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className="render-comp"
      >
        <div>
          <h2 style={{ color: "white" }}>Saved Jobs</h2>
        </div>
        {savedJobs.length !== 0 ? (
          paginatedData.map((job, index) => (
            <Card
              key={job._id}
              className="job-card"
              style={{
                backgroundColor: "#202020cc",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "white" }}
                >
                  {job.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  <b>Title: {job.jobId.title}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Location: {job.jobId.location}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Type: {job.jobId.type}
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  Deadline: {job.jobId.deadline}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <h3 style={{ color: "orange" }}>No saved jobs yet</h3>
        )}
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .Mui-selected": {
              color: "red",
              fontSize: "20px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SavedJobs;
