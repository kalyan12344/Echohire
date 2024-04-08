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
  const handleApply = async () => {
    navigate(`/applicationform/${loginData._id}/${jobData._id}`);
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
        <Button variant="contained" onClick={handleApply}>
          Save
        </Button>
        <Button variant="contained" onClick={handleApply}>
          Apply
        </Button>
      </div>
    </Card>
  );
};

const JobCardListJS = ({ jobs, loginData, onJobApply }) => {
  const [value, setValue] = useState([20, 80]); // Initial range values
  const jobTypes = ["contract", "full-Time", "part - time"];
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initialize with all jobs

  useEffect(() => handleApplyFilters(), []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <div className="render-comp">
        <div>
          <h2>Jobs Posted</h2>
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
        />
      </div>
    </div>
  );
};

export default JobCardListJS;
