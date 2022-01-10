import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar.js";
import Title from "../../components/Title.js";

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
    <Fragment>
      <Sidebar />
      <div className="container-minus-sidebar">
        {userInfo ? (
          <Title
            title="Dashboard"
            fname={userInfo.fname}
            lname={userInfo.lname}
            image={userInfo.profile_image}
            role={userInfo.role}
          />
        ) : (
          <p>Not Logged In</p>
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
