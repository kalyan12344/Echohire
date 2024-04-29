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
  TextField,
  Slider,
  Autocomplete,
} from "@mui/material";
import Switch from "@mui/material/Switch";

import Modal from "@mui/material/Modal";
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
const JobCardJS = ({ jobData, loginData, onJobApply }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setModalOpen(false);
    setOpen(false);
  };

  const handleOpen = () => {
    console.log(modalOpen);
    setModalOpen(true);
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
  const handleApply = async () => {
    navigate(`/applicationform/${loginData._id}/${jobData._id}`);
  };

  const handleSave = async () => {
    let jsId = loginData._id;
    console.log(jsId, jobData);
    // navigate(`/applicationform/${loginData._id}/${jobData._id}`);
    try {
      // Make a PUT request to the backend API endpoint
      const response = await axios.put("http://localhost:5001/api/saved-jobs", {
        jsId,
        jobData,
      });
      console.log(response.status);
      if (response.status === 201) {
        console.log("Job saved successfully");
        return true; // Return true to indicate success
      }
      if (response.status === 201) {
        console.log("Job saved successfully");
      } else {
        setOpen(true); // Display alert for any other response status
      }
    } catch (error) {
      if (error.response.status === 400) {
        setOpen(true);
      }
      console.error("Error saving job:", error.response.status);
      return false; // Return false to indicate failure
    }
  };

  return (
    <div>
      <Card
        onClick={handleOpen}
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
            message="You have already saved this job"
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
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </Card>
      {modalOpen && <JobModal jobData={jobData} onClose={handleClose} />}
    </div>
  );
};

const JobCardListJS = ({ jobs, loginData, onJobApply }) => {
  const [value, setValue] = useState([20, 80]);
  console.log("loginData", loginData);
  console.log("jobs", jobs);
  const jobTypes = ["contract", "full-Time", "part - time"];
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
  });
  const [isToggled, setIsToggled] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  // Initialize with all jobs
  useEffect(() => {}, [isToggled]);
  useEffect(() => handleApplyFilters(), []);
  useEffect(() => {
    const filteredAndSuggestedJobs = isToggled
      ? suggestJobs(jobs, loginData.skills, 1)
      : setFilteredJobs(jobs);

    console.log(filteredAndSuggestedJobs);
  }, [isToggled]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const suggestJobs = (jobs, seekerSkills, threshold) => {
    // Filter jobs based on skills match
    const suggestedJobs = jobs.filter((job) => {
      console.log(job?.skills);
      const jobSkills = job?.skills?.split(",").map((skill) => skill.trim());

      // Calculate match score
      const matchScore = jobSkills?.reduce((score, skill) => {
        if (seekerSkills?.includes(skill)) {
          return score + 1;
        }
        return score;
      }, 0);

      // Determine if match score exceeds threshold
      return matchScore >= threshold;
    });
    setFilteredJobs(suggestedJobs);
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

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    console.log(isToggled);
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: name === "skills" ? value.split(",") : value, // Convert skills string to array
    }));
  };

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedData = filteredJobs.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="rend-comp-parent">
      <div className="left-panel">
        <div>
          <label>Suggest Jobs</label>
          <Switch checked={isToggled} onChange={handleToggle} />
        </div>
        {!isToggled && (
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
                label="Location"
                name="location"
                variant="standard"
                value={filters.location}
                onChange={handleFilterChange}
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
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
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
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
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
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
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
        )}
      </div>
      <div className="render-comp">
        <div>
          <h2 style={{ color: "white" }}>Jobs </h2>
        </div>

        {filteredJobs.length !== 0 ? (
          paginatedData.map((job, index) => (
            <JobCardJS
              key={job.jobID}
              jobData={job}
              loginData={loginData}
              onJobApply={onJobApply}
            />
          ))
        ) : (
          <h3>No jobs matched the filters</h3>
        )}
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          style={{ marginTop: "20px" }}
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

export default JobCardListJS;
