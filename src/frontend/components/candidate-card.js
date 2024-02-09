import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const CandidateCard = ({ name, img, email, phone, location }) => {
  return (
    <Card
      sx={{
        width: "300px",
        backgroundColor: "#333333cc",
        color: "white",
        margin: "20px",
        height: "300px",
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
          <img src={img} style={{ borderRadius: "50%", height: "120px" }} />
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
        <Typography variant="body1">Location: {location}</Typography>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
