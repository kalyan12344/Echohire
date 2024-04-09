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
} from "@mui/material";
import axios from "axios";
import "../styling/jobs.css";
import { color } from "framer-motion";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";

const ITEMS_PER_PAGE = 4;
const JobCard = ({ jobData, onWithdrawApplication }) => {
  const statusColor = {
    Applied: "white",
    InConsideration: "green",
    Success: "green",
    Rejected: "red",
  };

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
          <Button onClick={handleWithdrawClick}>
            <FolderDeleteIcon sx={{ color: "red" }} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const MyApplications = ({ applications }) => {
  console.log(applications);
  const [totApplications, setApplications] = useState(...applications);
  console.log(applications);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleWithdrawApplication = async (applicationId) => {
    console.log(applicationId);

    try {
      // Make a DELETE request to the API endpoint with the application ID
      const response = await axios.delete(
        `http://localhost:5001/api/applications/${applicationId}`
      );

      // If the request is successful (status code 200-299), return true
      if (response.status >= 200 && response.status < 300) {
        const updatedApplications = totApplications.filter(
          (app) => app._id !== applicationId
        );
        setApplications(updatedApplications);
        return true;
      } else {
        // Handle unsuccessful request
        console.error("Failed to delete application:", response.statusText);
        return false;
      }
    } catch (error) {
      // Handle errors
      console.error("Error deleting application:", error.message);
      return false;
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
        <div className="filter-panel">
          <p>Filters</p>
        </div>
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
