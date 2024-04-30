import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
  Drawer,
  Box,
  Chip,
  TextField,
  Modal,
} from "@mui/material";
import axios from "axios";
import "../styling/jobs.css";
import { color } from "framer-motion";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import { ShareSharp } from "@mui/icons-material";

const ITEMS_PER_PAGE = 4;
const JobCard = ({ jobData, onWithdrawApplication, loginJsData }) => {
  console.log(loginJsData);
  const statusColor = {
    Applied: "white",
    InConsideration: "green",
    Success: "green",
    Rejected: "red",
  };

  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [interviewExperience, setInterviewExperience] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    jobSeekerName: loginJsData.firstName,
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(formData);
    // e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/interview-experiences",
        {
          companyName: formData.companyName,
          jobSeekerName: formData.jobSeekerName,
          experience: formData.experience,
        }
      );
      console.log("Response:", response.data);
      // Optionally, you can handle success message or redirect to another page
    } catch (error) {
      console.error("Error:", error.response.data);
      // Optionally, you can display an error message to the user
    }
    handleClose();
  };

  const body = (
    <Box sx={{ width: 500, bgcolor: "background.paper", p: 2 }}>
      <h2>Interview Experience</h2>
      <TextField
        label="companyName"
        name="companyName"
        variant="outlined"
        value={formData.companyName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="experience"
        name="experience"
        variant="outlined"
        value={formData.experience}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );

  console.log(jobData);
  const handleWithdrawClick = () => {
    onWithdrawApplication(jobData._id);
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
      <div className="applied-job-card">
        <CardContent className="job-content">
          <Typography variant="h5" component="div" sx={{ color: "white" }}>
            {jobData.jobId.title}
          </Typography>

          <Typography variant="body2" sx={{ color: "white" }}>
            Location: {jobData.jobId.location}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Type: {jobData.jobId.type}
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Deadline: {jobData.jobId.deadline}
          </Typography>
        </CardContent>
        <div
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "right",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {" "}
          <Chip
            label={jobData.status}
            sx={{
              backgroundColor: statusColor[jobData.status],
            }}
          />
          {jobData.status !== "Success" ? (
            <Button onClick={handleWithdrawClick}>
              <FolderDeleteIcon sx={{ color: "red" }} />
            </Button>
          ) : (
            <div>
              <Button
                sx={{ fontSize: "10px", color: "green" }}
                onClick={handleOpen}
              >
                Interview Experience
              </Button>
              <Modal
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-interview-title"
                aria-describedby="modal-interview-description"
              >
                {body}
              </Modal>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const MyApplications = ({ loginJsData }) => {
  const [applications, setJobApplications] = useState([]);
  console.log(applications);
  const [totApplications, setApplications] = useState(...applications);
  console.log(applications);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAppliedJobs();
  }, [applications]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const handleWithdrawApplication = async (applicationId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/applications/${applicationId}`
      );

      if (response.status >= 200 && response.status < 300) {
        // Update state after successful deletion
        const updatedApplications = totApplications.filter(
          (app) => app._id !== applicationId
        );
        setJobApplications(updatedApplications);
      } else {
        console.error("Failed to delete application:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting application:", error.message);
    }
  };

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(totApplications?.length / ITEMS_PER_PAGE);
  // Ensure that the last page is correctly set if there are fewer items than the items per page
  const lastPage = Math.max(
    1,
    Math.ceil(totApplications?.length / ITEMS_PER_PAGE)
  );
  const paginatedData = applications.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="rend-comp-parent">
      <div className="left-panel">
        <div className=""></div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        className="render-comp"
      >
        <div>
          <h2 style={{ color: "white" }}>Applied Jobs</h2>
        </div>
        {totApplications?.length !== 0 ? (
          paginatedData?.map((job, index) => (
            <JobCard
              key={job._id}
              jobData={job}
              onWithdrawApplication={handleWithdrawApplication}
              loginJsData={loginJsData}
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

export default MyApplications;
