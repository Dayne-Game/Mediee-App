import React from "react";

const Title = ({ title, fname, lname, image, role }) => {
  return (
    <div className="title-bar">
      <h1>{title}</h1>
      <div className="container-flex">
        <img src={image} alt="Profile" className="user-image" />
        <div className="user-text-box">
          <p className="user-name">
            {fname} {lname}
          </p>
          <p className="user-tagline">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Title;
