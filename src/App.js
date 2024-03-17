import "./App.css";
import EmployerBoard from "./frontend/components/employer-board";
import Login from "./frontend/components/login";
import SignupPage from "./frontend/components/signup";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import JsBoard from "./frontend/components/jsBoard";
import JobApplicationForm from "./frontend/components/job-application";
import ApplicationFormPage from "./frontend/components/Job-Application-Process/ApplicationForm_retirval";
// import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<SignupPage />} />
        <Route exact path="/employerboard" element={<EmployerBoard />} />
        <Route exact path="/jsboard" element={<JsBoard />} />
        <Route exact path="/applicationform/:jsid/:jobid" element={<JobApplicationForm />} />
        <Route exact path="/getform" element={<ApplicationFormPage />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
