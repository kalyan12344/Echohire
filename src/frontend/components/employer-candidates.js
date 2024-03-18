import React from "react";
import CandidateCard from "../components/candidate-card.js";
import "../styling/employer-candidates.css";
import axios from "axios";
import { useState } from "react";

const CandidateList = ({ applicationData }) => {
  const [reload, setReload] = useState(false);

  const handleCardReject = (details) => {
    updateApplicationStatus(details._id, "Rejected");
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
            name={`${candidate.jsdetails?.firstName} ${candidate.jsdetails?.lastName}`}
            img={candidate.img}
            email={candidate.jsdetails?.jsEmail}
            phone={candidate.phone}
            role={candidate.title}
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
