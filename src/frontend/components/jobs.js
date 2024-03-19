// *** Vyjayanthi **
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

const ITEMS_PER_PAGE = 4;

const JobCard = ({ jobData, onDelete, onUpdate }) => {
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

  const handleUpdateJobs = () => {
    console.log(editedJobData);
    onUpdate(editedJobData);
    closeDrawer();
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

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="edit-icon">
          <EditIcon
            sx={{ color: "orange" }}
            jobData={jobData}
            onClick={openDrawer}
            onUpdate={handleUpdateJobs}
          />
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
            <EditedJobPostform job={jobData} onUpdate={handleUpdateJobs} />
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
  const jobData = jobs;
  console.log(jobs);
  // const jobData = [...jobs];
  console.log(companyName);

  console.log(jobData);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDeleteJob = (jobID) => {
    console.log("Deleting job with ID:", jobID);
    const updatedJobData = jobData.filter((job) => job.jobID !== jobID);
  };
  const handleUpdateJob = (updatedJob) => {
    console.log("Deleting job with ID:", updatedJob);
    const updatedJobData = jobData.map((job) =>
      job.jobID === updatedJob.jobID ? updatedJob : job
    );
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

export default JobCardList;
