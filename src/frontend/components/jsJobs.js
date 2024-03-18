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
import Snackbar from "@mui/material/Snackbar";
import { set } from "mongoose";
import JobApplicationForm from "./job-application";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 4;


const JobCardJS = ({ jobData, loginData, onJobApply, navigate }) => {
  const [open, setOpen] = useState(false);

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
  const handleApply =  () => {

    navigate(`/applicationform/${loginData._id}/${jobData._id}`)
    return(
    <JobApplicationForm jobs={jobData} loginData={loginData}></JobApplicationForm>)
 
  };

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
      <Snackbar
        open={open}
        autoHideDuration={2000}
        severity="success"
        onClose={handleClose}
        message="You have already for this job"
        action={action}
      />
      <Button variant="contained" onClick={handleApply}>
        Apply 
      </Button>
    </Card>
  );
};

const JobCardListJS = ({ jobs, loginData, onJobApply }) => {
  const jobData = jobs;
  console.log(jobs);
  const navigate = useNavigate();
  // const jobData = [...jobs];

  console.log(jobData);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(jobData.length / ITEMS_PER_PAGE);
  const paginatedData = jobData.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="rend-comp-parent">
      <div className="left-panel">
        <div className="filter-panel">
          <p>Filters</p>
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className="render-comp"
      >
        <div>
          <h2 style={{ color: "white" }}>Jobs Posted</h2>
        </div>
        {jobData.length !== 0 ? (
          paginatedData.map((job, index) => (
            <JobCardJS
              key={job.jobID}
              jobData={job}
              loginData={loginData}
              onJobApply={onJobApply}
              navigate={navigate}
            />
          ))
        ) : (
          <h3 style={{ color: "orange" }}>No jobs Posted Yet</h3>
        )}
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              // backgroundColor: "red",
            },
            "& .Mui-selected": {
              // backgroundColor: "#202020cc",
              color: "red",
              fontSize: "20px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default JobCardListJS;
