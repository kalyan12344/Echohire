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
import "../styling/jobs.css";
import { color } from "framer-motion";

const ITEMS_PER_PAGE = 4;
const JobCard = ({ jobData }) => {
  const statusColor = {
    Applied: "white",
    InConsideration: "green",
    Success: "green",
    Rejected: "red",
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
        <div
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <Chip
            label={jobData.status}
            sx={{
              backgroundColor: statusColor[jobData.status],
            }}
          />
        </div>
      </div>
    </Card>
  );
};

const MyApplications = ({ applications }) => {
  console.log(applications);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(applications.length / ITEMS_PER_PAGE);
  // Ensure that the last page is correctly set if there are fewer items than the items per page
  const lastPage = Math.max(1, Math.ceil(applications.length / ITEMS_PER_PAGE));
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
        {applications.length !== 0 ? (
          paginatedData.map((job, index) => (
            <JobCard key={job._id} jobData={job} />
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
