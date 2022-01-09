import React, { Fragment } from "react";

import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Fragment>
      <ul>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default Nav;
