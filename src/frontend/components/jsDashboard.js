// Bhanuja
import "../styling/employer-dashboard.css";
const JsDashboard = ({ username, appliedJobs, savedJobs }) => {
  const totalAppliedJobs = appliedJobs.length;
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
          <div className="innner-box"></div>
        </div>
        <div class="grid2">
          <div className="innner-box">2</div>
        </div>
        <div class="grid3">
          <div className="innner-box">
            <p>Toatl Saved Jobs</p>
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
          <div className="innner-box"></div>
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

export default JsDashboard;
