import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";

import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Home from "./screens/Home/Home";
import LoginScreen from "./screens/Login/LoginScreen";
import StaffScreen from "./screens/Staff/StaffScreen";
import AddStaffScreen from "./screens/Staff/AddStaffScreen";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/staff" component={StaffScreen} exact />
      <Route path="/staff/add" component={AddStaffScreen} />
    </Router>
  );
}

export default App;
