import "../styling/job-post.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Switch,
  InputAdornment,
} from "@mui/material";
// import { withStyles } from "@mui/styles";

import React from "react";
import { useState } from "react";
import { set } from "mongoose";

const theme = createTheme({
  components: {
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

const EditedJobPostform = ({ job, onUpdate }) => {
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(
    job.location ? "onsite" : "remote"
  );
  const [discloseSalary, setDiscloseSalary] = useState(
    job?.salary ? true : false
  );

  //   console.log(discloseSalary);

  const [selectedOptionType, setSelectedOptionType] = useState(
    job.type.toLowerCase()
  );
  const [jobDetails, setJobDetails] = useState({
    title: job.title,
    description: job.description,
    qualifications: job.qualifications,
    skills: job.skills,
    location: job.location,
    type: job.type,
    deadline: job.deadline,
    salary: job?.salary,
  });
  const handleToggle = () => {
    setDiscloseSalary(!discloseSalary);
  };

  const handleOptionChangeLoc = (event) => {
    const value = event.target.value;
    setSelectedOptionLocation(value);
  };
  const handleOptionChangeType = (event) => {
    const value = event.target.value;
    setSelectedOptionType(value);
    setJobDetails({ ...jobDetails, type: value });
  };
  const handleEditPostJob = () => {
    console.log(jobDetails);
    onUpdate(jobDetails);
  };
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ color: "white" }}>Job Details</h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField
            id="job-title"
            label="Title"
            value={jobDetails.title}
            onChange={(event) => {
              console.log(jobDetails);
              setJobDetails({
                ...jobDetails,
                title: event.target.value,
              });
            }}
            variant="standard"
            sx={{
              width: "250px",
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
            id="job-desc"
            label="Description"
            multiline
            maxRows={4}
            sx={{
              width: "250px",
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInput-underline:before": { borderBottomColor: "white" },
              "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "white" },
            }}
            value={jobDetails.description}
            onChange={(event) => {
              setJobDetails({
                ...jobDetails,
                description: event.target.value,
              });
            }}
            variant="standard"
          />
          <div style={{ display: "flex", gap: "50px" }}>
            <TextField
              id="job-qualifications"
              label="Qualifications"
              multiline
              maxRows={4}
              value={jobDetails.qualifications}
              onChange={(event) => {
                setJobDetails({
                  ...jobDetails,
                  qualifications: event.target.value,
                });
              }}
              variant="standard"
              sx={{
                width: "250px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              id="job-skills"
              label="Skills"
              multiline
              maxRows={4}
              variant="standard"
              value={jobDetails.skills}
              onChange={(event) => {
                setJobDetails({
                  ...jobDetails,
                  skills: event.target.value,
                });
              }}
              sx={{
                width: "250px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <p style={{ color: "white" }}>DisClose Salary</p>
            <Switch checked={discloseSalary} onChange={handleToggle} />
            {discloseSalary && (
              <TextField
                id="job-salary"
                label="Salary"
                variant="standard"
                type="number"
                value={jobDetails.salary}
                onChange={(event) => {
                  setJobDetails({
                    ...jobDetails,
                    salary: event.target.value,
                  });
                }}
                sx={{
                  width: "250px",
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: "white" },
                }}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              color: "white",
            }}
          >
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={selectedOptionLocation}
                onChange={handleOptionChangeLoc}
              >
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Remote"
                  value="remote"
                />
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Hybrid"
                  value="hybrid"
                />
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Onsite"
                  value="onsite"
                />
              </RadioGroup>
            </FormControl>

            {selectedOptionLocation != "remote" && (
              <TextField
                id="job-location"
                label="Location"
                variant="standard"
                value={jobDetails.location}
                sx={{
                  width: "250px",
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "white",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: "white" },
                }}
                onChange={(event) => {
                  setJobDetails({
                    ...jobDetails,
                    location: event.target.value,
                  });
                }}
              />
            )}
          </div>
          <div>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={selectedOptionType}
                onChange={handleOptionChangeType}
                style={{ color: "white" }}
              >
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Full-Time"
                  value="full-time"
                />
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Part-Time"
                  value="part-time"
                />
                <FormControlLabel
                  control={<Radio sx={{ color: "white" }} />}
                  label="Contract"
                  value="contract"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider> */}
          <div style={{ display: "flex", gap: "20px", alignItems: "baseline" }}>
            <p style={{ color: "white" }}> Deadline:</p>
            <TextField
              id="job-deadline"
              label=""
              variant="standard"
              type="date"
              value={jobDetails.deadline}
              sx={{
                width: "250px",
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "white",
                },
                "& .MuiInputAdornment-root": { color: "white" }, // Hide default icon

                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
              onChange={(event) => {
                setJobDetails({
                  ...jobDetails,
                  deadline: event.target.value,
                });
              }}
            />
          </div>
          <Button
            onClick={handleEditPostJob}
            variant="contained"
            sx={{
              marginTop: "20px",
              width: "200px",
              borderRadius: "30px",
              // backgroundColor: "rgba(255, 0, 0, 0.75)",
              // "&:hover": {
              //   backgroundColor: "rgba(255, 0, 0, 1)",
              // },
            }}
            style={{
              color: "white",
            }}
          >
            EDIT JOB POST
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditedJobPostform;