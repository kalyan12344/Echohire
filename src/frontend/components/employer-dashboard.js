import "../styling/employer-dashboard.css";
const EmployerDashboard = ({ username, jobs, recievedApplications }) => {
  let hired = 0;
  let inConsideration = 0;
  let applied = 0;
  let interviewScheduled = 0;
  let rejected = 0;
  console.log(jobs);
  console.log(recievedApplications);
  recievedApplications.forEach((application) => {
    if (application.status === "Rejected") {
      rejected = rejected + 1;
    } else if (application.status === "InConsideration") {
      inConsideration = inConsideration + 1;
    } else if (application.status === "Applied") {
      applied = applied + 1;
    } else if (application.status === "Hired") {
      hired = hired + 1;
    } else if (application.status === "Interview") {
      interviewScheduled = interviewScheduled + 1;
    }
  });

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
          <div className="innner-box">4</div>
        </div>
        <div class="grid5">
          <div className="innner-box">
            <p>Total Jobs</p>
            <div>{totalJobs}</div>
          </div>
        </div>
        <div class="grid6">
          <div className="innner-box">6</div>
        </div>
        <div class="grid7">
          <div className="innner-box">7</div>
        </div>
        <div class="grid8">
          <div className="innner-box">8</div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
