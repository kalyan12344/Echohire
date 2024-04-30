import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Drawer,
  Box,
  TextField,
  Slider,
  Autocomplete,
} from "@mui/material";
import "../styling/jobs.css";
import Modal from "@mui/material/Modal";

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
const JobModal = ({ jobData, onClose }) => {
  return (
    <Modal open={true} onClose={onClose} sx={{ margin: "50px" }}>
      <Card
        sx={{
          backgroundColor: "#222222",
          color: "white",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(255,255,255,0.3)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {jobData.title}
          </Typography>
          <Typography variant="body2">Location: {jobData.location}</Typography>
          <Typography variant="body2">Type: {jobData.type}</Typography>
          {/* <Typography variant="body2">Deadline: {jobData.deadline}</Typography> */}
          <Typography variant="body2">
            Description: {jobData.description}
          </Typography>
          <Typography variant="body2">Salary: {jobData.salary}</Typography>
          <Typography variant="body2">Skills: {jobData.skills}</Typography>
          <Typography variant="body2">
            Qualification: {jobData.qualifications}
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              borderRadius: "30px",
              marginTop: "30px",
              backgroundColor: "rgba(255, 0, 0, 0.75)",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 1)",
              },
            }}
          >
            Close
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};
const JobCard = ({ jobData, onDelete, onUpdate }) => {
  console.log(jobData);
  const [modalOpen, setModalOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editedJobData, setEditedJobData] = useState({ ...jobData });
  const handleClose = (event, reason) => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    console.log(modalOpen);
    setModalOpen(true);
  };
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
    <div>
      <Card
        // onClick={handleOpen}
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
      {modalOpen && <JobModal jobData={jobData} onClose={handleClose} />}
    </div>
  );
};

const JobCardList = ({ username, jobs }) => {
  const companyName = username.username;
  const jobTypes = ["contract", "full-Time", "part - time"];

  const [jobData, setJobData] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
  });
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleApplyFilters = () => {
    // Filter the jobs based on the applied filters
    const filtered = jobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(filters.title.toLowerCase()) &&
        job.location?.toLowerCase().includes(filters.location.toLowerCase()) &&
        job.type?.toLowerCase().includes(filters.type.toLowerCase()) &&
        (filters.minSalary === "" ||
          job.salary >= parseInt(filters.minSalary)) &&
        (filters.maxSalary === "" ||
          job.salary <= parseInt(filters.maxSalary)) &&
        // Check if any skill in the filters.skills array is included in the job.skills array
        (filters.skills.length === 0 ||
          filters.skills.some((skill) => job.skills.includes(skill)))
      );
    });
    // Update the filtered jobs state
    setFilteredJobs(filtered);
  };
  useEffect(() => {}, []);
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "skills" ? value.split(",") : value, // Convert skills string to array
    }));
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
          <div className="filter-title">
            <p>Filters</p>
          </div>
          <div className="filter-panel-filters">
            <TextField
              label="Title"
              name="title"
              value={filters.title}
              variant="standard"
              onChange={handleFilterChange}
              sx={{
                width: "200px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                "& .MuiInputAdornment-root svg": { color: "white" },
              }}
            />
            <TextField
              label="Location"
              name="location"
              variant="standard"
              value={filters.location}
              onChange={handleFilterChange}
              sx={{
                width: "200px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                "& .MuiInputAdornment-root svg": { color: "white" },
              }}
            />
            <Autocomplete
              id="company-type"
              options={jobTypes}
              value={filters.type}
              onChange={(event, newValue) => {
                setFilters({
                  ...filters,
                  type: newValue,
                });
              }}
              sx={{
                width: "200px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                "& .MuiInputAdornment-root svg": { color: "white" },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Job Type"
                  variant="standard"
                  sx={{
                    width: "200px",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInputAdornment-root svg": { color: "white" },
                  }}
                />
              )}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <TextField
                label="Min Salary"
                name="minSalary"
                variant="standard"
                value={filters.minSalary}
                onChange={handleFilterChange}
                sx={{
                  width: "90px",
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: "white" },
                  "& .MuiInputAdornment-root svg": { color: "white" },
                }}
              />
              <TextField
                label="Max Salary"
                name="maxSalary"
                variant="standard"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                sx={{
                  width: "90px",
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: "white" },
                  "& .MuiInputAdornment-root svg": { color: "white" },
                }}
              />
            </div>
            <TextField
              label="Skills"
              name="skills"
              variant="standard"
              value={filters.skills.join(",")}
              onChange={handleFilterChange}
              sx={{
                width: "200px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
                "& .MuiInputAdornment-root svg": { color: "white" },
              }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              style={{
                marginTop: "20px",
                borderRadius: "20px",
                height: "30px",
                width: "130px",
                padding: "0",
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className="render-comp"
      >
        <div>
          <h2 style={{ color: "white" }}>Jobs Posted</h2>
        </div>
        {filteredJobs.length !== 0 ? (
          filteredJobs.map((job, index) => (
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
