import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/Header";

import LoginScreen from "./screens/Login/LoginScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/Register/RegisterScreen";
import StaffScreen from "./screens/Staff/StaffScreen";
import AddStaffScreen from "./screens/Staff/AddStaffScreen";

import "./index.css";
import EditStaffScreen from "./screens/Staff/EditStaffScreen";
import StaffProfileScreen from "./screens/Staff/StaffProfileScreen";
import ResidentScreen from "./screens/Resident/ResidentScreen";
import AddResidentScreen from "../src/screens/Resident/AddResidentScreen";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/staff/add" component={AddStaffScreen} exact />
          <Route path="/search/:keyword" component={StaffScreen} exact />
          <Route path="/staff" component={StaffScreen} exact />
          <Route path="/staff/edit/:id" component={EditStaffScreen} />
          <Route
            path="/staffprofile/:id"
            component={StaffProfileScreen}
            exact
          />
          <Route path="/residents" component={ResidentScreen} exact />
          <Route path="/residents/add" component={AddResidentScreen} />
        </Container>
      </div>
    </Router>
  );
}

export default App;
