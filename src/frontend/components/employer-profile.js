import React from "react";
import "../styling/employer-profile.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const EmployerProfile = (employerDetails) => {
  console.log(employerDetails.employerDetails);
  const employerInfo = employerDetails.employerDetails;
  return (
    <div className="total-profile">
      <div className="logo-title">
        <div className="company-logo">
          <img
            className="company-logo-image"
            src="data:image/png;base64,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"
          />{" "}
        </div>
        <div>
          <h3 className="company-title">{employerInfo.companyName}</h3>
          <p className="comp-type">A {employerInfo.companyType} Company</p>
        </div>

        <div className="comp-size">
          <p>Company Size</p>
          <p style={{ transform: "translateY(-20px)" }}> 36,000</p>
        </div>

        <div className="comp-edit">
          <ModeEditIcon />
        </div>
      </div>
      <div className="company-desc">
        <p>{employerInfo.companyDescription}</p>
      </div>
    </div>
  );
};

export default EmployerProfile;
