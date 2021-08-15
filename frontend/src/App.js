import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header/Header";

import LoginScreen from "./screens/Login/LoginScreen";
import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/Register/RegisterScreen";
import StaffScreen from "./screens/Staff/StaffScreen";

import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/staff" component={StaffScreen} exact />
        </Container>
      </div>
    </Router>
  );
}

export default App;
