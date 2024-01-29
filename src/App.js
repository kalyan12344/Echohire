import "./App.css";
import Login from "./frontend/components/login";
import SignupPage from "./frontend/components/signup";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
