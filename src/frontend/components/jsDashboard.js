// Bhanuja
import "../styling/js-dashboard.css";
const JsDashboard = ({ username, appliedJobs, savedJobs }) => {
  let hired = 0;
  let inConsideration = 0;
  let applied = 0;
  let interviewScheduled = 0;
  let rejected = 0;
  const totalAppliedJobs = appliedJobs.length;
  console.log(appliedJobs);

  appliedJobs.forEach((application) => {
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
  return (
    <div className="employer-dashboard">
      <div className="welcome-employer">
        Hello<span className="employer-name">{username}!!!</span>
      </div>
      <div
        className="wrapper"
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        <div class="grid1">
          <div className="innner-box" style={{ display: "flex", gap: "20px" }}>
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
            <p>Total Saved Jobs</p>
            <div>{savedJobs.length}</div>
          </div>
        </div>
        <div class="grid4">
          <div className="innner-box">
            <p>Total Applied Jobs</p>
            <div>{totalAppliedJobs}</div>
          </div>
        </div>
        <div class="grid5">
          <div className="innner-box">
            <div>TBD</div>
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

export default JsDashboard;
