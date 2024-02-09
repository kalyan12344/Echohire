import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import "../styling/jobs.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";

const ITEMS_PER_PAGE = 4;

const JobCard = ({ jobData }) => {
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
          <EditIcon sx={{ color: "orange" }} />
        </div>
        <div className="delete-icon">
          <DeleteIcon sx={{ color: "#ff2600d2" }} />
        </div>
      </div>
    </Card>
  );
};

const JobCardList = () => {
  const dummyJobData = [
    {
      title: "Software Engineer",
      description: "Join our dynamic team of software engineers...",
      qualifications: "Bachelor's degree in Computer Science...",
      skills: "React, Node.js, MongoDB, JavaScript...",
      location: "New York, NY",
      type: "Full-Time",
      deadline: "2022-03-01",
    },
    {
      title: "Data Scientist",
      description: "Exciting opportunity for a skilled data scientist...",
      qualifications: "Master's degree in Data Science or related field...",
      skills: "Python, Machine Learning, SQL...",
      location: "San Francisco, CA",
      type: "Contract",
      deadline: "2022-03-15",
    },
    {
      title: "Software Engineer",
      description: "Join our dynamic team of software engineers...",
      qualifications: "Bachelor's degree in Computer Science...",
      skills: "React, Node.js, MongoDB, JavaScript...",
      location: "New York, NY",
      type: "Full-Time",
      deadline: "2022-03-01",
    },
    {
      title: "Data Scientist",
      description: "Exciting opportunity for a skilled data scientist...",
      qualifications: "Master's degree in Data Science or related field...",
      skills: "Python, Machine Learning, SQL...",
      location: "San Francisco, CA",
      type: "Contract",
      deadline: "2022-03-15",
    },
    {
      title: "Software Engineer",
      description: "Join our dynamic team of software engineers...",
      qualifications: "Bachelor's degree in Computer Science...",
      skills: "React, Node.js, MongoDB, JavaScript...",
      location: "New York, NY",
      type: "Full-Time",
      deadline: "2022-03-01",
    },
    {
      title: "Data Scientist",
      description: "Exciting opportunity for a skilled data scientist...",
      qualifications: "Master's degree in Data Science or related field...",
      skills: "Python, Machine Learning, SQL...",
      location: "San Francisco, CA",
      type: "Contract",
      deadline: "2022-03-15",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(dummyJobData.length / ITEMS_PER_PAGE);
  const paginatedData = dummyJobData.slice(offset, offset + ITEMS_PER_PAGE);

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
        {paginatedData.map((job, index) => (
          <JobCard key={index} jobData={job} />
        ))}
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
