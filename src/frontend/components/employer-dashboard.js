import "../styling/employer-dashboard.css";
const EmployerDashboard = ({ username, jobs }) => {
  console.log(jobs);
  const totalJobs = jobs?.length;
  return (
    <div className="employer-dashboard">
      <div className="welcome-employer">
        Hello<span className="employer-name">{username}!!!</span>
      </div>
      <div class="wrapper">
        <div class="grid1">
          <div className="innner-box"></div>
        </div>
        <div class="grid2">
          <div className="innner-box">2</div>
        </div>
        <div class="grid3">
          <div className="innner-box">3</div>
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
