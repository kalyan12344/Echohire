import React, { useState } from "react";
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
import EditedJobPostform from "./post-edited-job";
import axios from "axios";

const ITEMS_PER_PAGE = 4;

const JobCard = ({ jobData, onDelete, onUpdate }) => {
  console.log(jobData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedJobData, setEditedJobData] = useState({ ...jobData });

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleDeleteJob = () => {
    console.log(jobData);
    onDelete(jobData.jobID);
  };

  const handleUpdateJobs = (updatedData) => {
    console.log(updatedData);
    onUpdate(updatedData);
    closeDrawer();
  };

  const handleEditJobDataChange = (updatedData) => {
    setEditedJobData(updatedData);
  };

  console.log(editedJobData);

  return (
    <Card
      className="job-card"
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

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="edit-icon">
          <EditIcon sx={{ color: "orange" }} onClick={openDrawer} />
        </div>
        <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
          <Box
            sx={{
              width: 600,
              padding: "20px",
              height: 1000,
              backgroundColor: "#1a1819",
            }}
          >
            <EditedJobPostform
              job={editedJobData}
              onUpdate={handleUpdateJobs}
              onChange={handleEditJobDataChange}
            />
          </Box>
        </Drawer>
        <div className="delete-icon">
          <DeleteIcon sx={{ color: "#ff2600d2" }} onClick={handleDeleteJob} />
        </div>
      </div>
    </Card>
  );
};

const JobCardList = ({ username, jobs }) => {
  const companyName = username.username;
  const [jobData, setJobData] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteJob = (jobID) => {
    console.log("Deleting job with ID:", jobID);
    const updatedJobData = jobData.filter((job) => job.jobID !== jobID);
    setJobData(updatedJobData);
  };

  // const handleUpdateJob = (updatedJob) => {
  //   console.log(updatedJob);
  //   console.log("Updating job with ID:", updatedJob._id);
  //   const updatedJobData = jobData.map((job) =>
  //     job._id === updatedJob._id ? updatedJob : job

  //   );
  //   console.log(updatedJobData);
  //   setJobData(updatedJobData);
  // };

  const handleUpdateJob = async (updatedJob) => {
    try {
      console.log(updatedJob);
      console.log("Updating job with ID:", updatedJob._id);

      // Send updated job data to backend
      const response = await axios.put(
        `http://localhost:5001/api/jobupdate/${updatedJob._id}`,
        updatedJob
      );

      // If the request is successful (status code 200-299), handle the updated job data
      if (response.status >= 200 && response.status < 300) {
        const updatedJobFromServer = response.data;
        console.log("Job updated on the server:", updatedJobFromServer);

        // Update the job data in your frontend state
        const updatedJobData = jobData.map((job) =>
          job._id === updatedJob._id ? updatedJobFromServer : job
        );
        setJobData(updatedJobData);
      } else {
        // Handle unsuccessful request
        console.error("Failed to update job:", response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error("Error updating job:", error.message);
    }
  };
  console.log(jobData);

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
            <JobCard
              key={job.jobID}
              jobData={job}
              onDelete={handleDeleteJob}
              onUpdate={handleUpdateJob}
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

export default JobCardList;
