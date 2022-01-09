import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from "./screens/Dashboard/Dashboard";
import RegisterScreen from "./screens/Register/RegisterScreen";
import Home from "./screens/Home/Home";

import "./index.css";
import LoginScreen from "./screens/Login/LoginScreen";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={LoginScreen} />
    </Router>
  );
}

export default App;
