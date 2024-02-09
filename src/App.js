import "./App.css";
import EmployerDashboard from "./frontend/components/employer-board";
import Login from "./frontend/components/login";
import SignupPage from "./frontend/components/signup";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
// import { MantineProvider } from "@mantine/core";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<SignupPage />} />
        <Route
          exact
          path="/employerDashboard"
          element={<EmployerDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
