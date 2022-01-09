import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { login } from "../../actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container-fluid">
      <div className="flex-container">
        <div className="split-2"></div>
        <div className="split-1">
          <form
            onSubmit={submitHandler}
            className="form-container"
            style={{ width: "360px" }}
          >
            <div className="form-title-box">
              <h2 className="form-title">Login Account</h2>
            </div>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <div className="input-container">
              <input
                type="email"
                className="form-input"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input-container">
              <input
                type="password"
                className="form-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="input-container">
              <button type="submit" className="form-button">
                Submit
              </button>
            </div>
            <p className="form-subtitle text-center mt-2">
              Don't have an account? Create one <Link to="/register">HERE</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
