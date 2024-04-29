import React, { useEffect } from "react";
import CandidateCard from "../components/candidate-card.js";
import "../styling/employer-candidates.css";
import axios from "axios";
import { useState } from "react";

const CandidateList = ({ loginCompanyData }) => {
  const [reload, setReload] = useState(false);
  // console.log(applicationData);
  // console.log("applicationData", applicationData);
  const [applicationData, setApplicationData] = useState([]);
  useEffect(() => {
    getRecievedApplications();
  }, [reload]);
  const handleCardReject = (details) => {
    updateApplicationStatus(details._id, "Rejected");
  };
  const getRecievedApplications = async () => {
    console.log(loginCompanyData?.companyName);
    try {
      const response = await axios.get(
        `http://localhost:5001/company/${loginCompanyData?.companyName}/jobforms`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Applications fetched successfully:", response.data);
        const applications = response.data;
        console.log(applications);
        const mergedApplications = await Promise.all(
          applications?.map(async (application) => {
            const jobSeekerData = await fetchJobSeekerData(application.jsId);
            console.log(jobSeekerData);
            const jsdetails = jobSeekerData;
            console.log(jsdetails);
            return { ...application, jsdetails: jsdetails[0] };
          })
        );
        // Process the merged applications data as needed
        setApplicationData(mergedApplications);
        console.log(mergedApplications);
      } else {
        console.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const fetchJobSeekerData = async (jsID) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/jsdetails/${jsID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job seeker data for ID ${jsID}:`, error);
      return null;
    }
  };
  const handleCardFurthur = (details) => {
    let newStatus = "";
    if (details.status === "Applied") {
      newStatus = "InConsideration";
    } else if (details.status === "InConsideration") {
      newStatus = "Success";
    } else {
      newStatus = details.status;
    }
    updateApplicationStatus(details._id, newStatus);
  };
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/updateapplication/${applicationId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        console.log("Application status updated successfully");
        setReload(!reload);
      } else {
        console.error("Failed to update application status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  return (
    <div className="candidates-total">
      {applicationData.map((candidate) => {
        console.log(candidate.status);

        return (
          <CandidateCard
            key={candidate._id}
            name={`${candidate?.firstname} ${candidate?.lastname}`}
            img={candidate.img}
            email={candidate?.email}
            phone={candidate.phone}
            role={candidate?.jobId?.title}
            applicationDetails={candidate}
            onReject={handleCardReject}
            onFurthur={handleCardFurthur}
          />
        );
      })}
    </div>
  );
};

export default CandidateList;
