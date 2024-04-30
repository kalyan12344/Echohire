import "../styling/employer-dashboard.css";
import axios from "axios";
import { useEffect, useState } from "react";
const EmployerDashboard = ({ loginCompanyData, jobs }) => {
  let hired = 0;
  let username = loginCompanyData.companyName;
  let inConsideration = 0;
  let applied = 0;
  let interviewScheduled = 0;
  let rejected = 0;
  console.log(jobs);
  const [recievedApplications, setApplications] = useState([]);
  useEffect(() => {
    getRecievedApplications();
  }, []);
  recievedApplications.forEach((application) => {
    if (application.status === "Rejected") {
      rejected = rejected + 1;
    } else if (application.status === "InConsideration") {
      inConsideration = inConsideration + 1;
    } else if (application.status === "Applied") {
      applied = applied + 1;
    } else if (application.status === "Success") {
      hired = hired + 1;
    } else if (application.status === "Interview") {
      interviewScheduled = interviewScheduled + 1;
    }
  });

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

        // Process the merged applications data as needed
        setApplications(applications);
        console.log(applications);
      } else {
        console.error("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  console.log(hired, inConsideration, applied, interviewScheduled, rejected);
  const totalJobs = jobs?.length;
  const totalApplicationRecieved = recievedApplications?.length;
  return (
    <div className="employer-dashboard">
      <div className="welcome-employer">
        Hello<span className="employer-name">{username}!!!</span>
      </div>
      <div class="wrapper">
        <div class="grid1">
          <div className="inner-box" style={{ display: "flex", gap: "20px" }}>
            <div>
              <p>Hired</p>
              <div>{hired}</div>
            </div>
            <div>
              <p>InConsideration</p>
              <div>{inConsideration}</div>
            </div>
            <div>
              <p>Applied</p>
              <div>{applied}</div>
            </div>
            <div>
              <p>Interview Scheduled</p>
              <div>{interviewScheduled}</div>
            </div>
            <div>
              <p>Rejected</p>
              <div>{rejected}</div>
            </div>
          </div>
        </div>
        {/* <div class="grid2">
          <div className="innner-box">2</div>
        </div> */}
        <div class="grid3">
          <div className="innner-box">
            <p>Total Applications Recieved</p>
            <div>{totalApplicationRecieved}</div>
          </div>
        </div>
        <div class="grid4">
          <div className="innner-box">
            <p>Total Active Applications</p>
            <div>{inConsideration + applied + interviewScheduled}</div>
          </div>
        </div>
        <div class="grid5">
          <div className="innner-box">
            <p>Total Jobs Posted</p>
            <div>{totalJobs}</div>
          </div>
        </div>
        <div class="grid6">
          <div className="innner-box">
            <p>TBD</p>
          </div>
        </div>
        <div class="grid7">
          <div className="innner-box">
            <div>TBD</div>
          </div>
        </div>
        <div class="grid8">
          <div className="innner-box">
            <div>TBD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
