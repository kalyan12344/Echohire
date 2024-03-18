import React from "react";
import { Card, CardContent, Chip, Typography } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import usaData from "../components/usa.json";

const CandidateCard = ({
  name,
  img,
  email,
  phone,
  role,
  applicationDetails,
  onReject,
  onFurthur,
}) => {
  const handleReject = () => {
    onReject(applicationDetails);
  };

  const handleFurthur = () => {
    onFurthur(applicationDetails);
  };

  console.log(usaData);
  const status = applicationDetails.status;
  console.log(status);
  return (
    <Card
      sx={{
        width: "300px",
        backgroundColor: "#333333cc",
        color: "white",
        margin: "20px",
        height: "400px",
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={img}
            style={{ borderRadius: "50%", height: "120px" }}
            alt="avatar"
          />
        </div>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {phone}
        </Typography>
        <Typography variant="body1">Applied-For: {role}</Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {console.log(status)}
        (
        <Chip
          label={status == "Rejected" || "Success" ? "Rejected" : "Reject"}
          color="error"
          // disabled={status == "Rejected" || "Success" ? true : false}
          className="chip"
          onClick={handleReject}
        />
        )
        {status === "Applied" || status === "InConsideration" ? (
          <Chip
            label="Move Furthur"
            color="success"
            className="chip"
            // disabled={status === "Rejected" || "Success" ? true : false}
            onClick={handleFurthur}
          />
        ) : (
          ""
        )}
      </div>

      {status === "Success" ? (
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            style={{ width: "50px", paddingTop: "20px" }}
            src="https://img.icons8.com/?size=48&id=15427&format=png"
          />{" "}
        </div>
      ) : (
        ""
      )}

      {status === "Rejected" ? (
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            style={{ width: "50px", paddingTop: "20px", color: "red" }}
            src="https://img.icons8.com/?size=48&id=13903&format=png"
          />{" "}
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};

export default CandidateCard;
