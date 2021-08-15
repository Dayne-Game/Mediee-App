import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      {userInfo ? <h1>Welcome {userInfo.name}</h1> : <h1>Not Logged In</h1>}
    </div>
  );
};

export default Dashboard;
