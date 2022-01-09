import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      {userInfo ? (
        <div className="sidebar">
          <ul className="items-container">
            <li className="item">
              <NavLink activeClassName="item-active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="item">
              <NavLink activeClassName="item-active" to="/residents">
                Residents
              </NavLink>
            </li>
            {userInfo && userInfo.isAdmin && (
              <li className="item">
                <NavLink activeClassName="item-active" to="/staff">
                  Staff
                </NavLink>
              </li>
            )}
            <li className="item">
              <NavLink activeClassName="item-active" to="/history">
                History
              </NavLink>
            </li>
            <li className="item logout">
              <NavLink onClick={logoutHandler} to="#">
                <i className="fas fa-sign-out-alt" /> Logout
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </Fragment>
  );
};

export default Sidebar;
