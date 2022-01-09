import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar.js";

const Dashboard = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    console.log(userInfo.profile_image);
  }, [dispatch, history, userInfo]);

  return (
    <Fragment>
      <Sidebar />
      <div className="container-minus-sidebar">
        <div className="title-bar">
          <h1>Dashboard</h1>
          <div className="container-flex">
            <img
              src={userInfo.profile_image}
              alt="Profile"
              className="user-image"
            />
            {userInfo ? (
              <div className="user-text-box">
                <p className="user-name">
                  {userInfo.fname} {userInfo.lname}
                </p>
                <p className="user-tagline">{userInfo.role}</p>
              </div>
            ) : (
              <p>Not logged in</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
