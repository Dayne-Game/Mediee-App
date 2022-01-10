import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { registerStaff } from "../../actions/userActions";
import { STAFF_REGISTER_RESET } from "../../constants/userConstants";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Title from "../../components/Title";

const AddStaffScreen = ({ history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [image, setImage] = useState(""); // profile_image
  const [resthome_name, setResthome_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const staffRegister = useSelector((state) => state.staffRegister);
  const { loading, error, success } = staffRegister;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        dispatch({ type: STAFF_REGISTER_RESET });
        history.push("/staff");
      }
    } else {
      history.push("/login");
    }
  }, [history, userInfo, success, dispatch]);

  // Profile Image Upload Handler
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        registerStaff(
          fname,
          lname,
          image,
          resthome_name,
          email,
          password,
          role,
          isAdmin
        )
      );
    }
  };

  return (
    <Fragment>
      <Sidebar />
      <div className="container-minus-sidebar">
        {userInfo ? (
          <Title
            title="Add Staff Member"
            fname={userInfo.fname}
            lname={userInfo.lname}
            image={userInfo.profile_image}
            role={userInfo.role}
          />
        ) : (
          <p>Not Logged In</p>
        )}
        <form onSubmit={submitHandler} className="form-container">
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <div className="input-container">
            <input
              type="name"
              className="form-input"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            ></input>
            <input
              type="name"
              className="form-input"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            ></input>
          </div>
          <div className="input-container upload-input">
            <label>Upload Profile Picture</label>
            <input
              type="file"
              id="image-file"
              placeholder="Profile Image"
              className="form-input"
              onChange={uploadFileHandler}
            ></input>
            {uploading && <Loader />}
          </div>
          <div className="input-container">
            <input
              type="text"
              className="form-input"
              placeholder="Resthome Name"
              value={resthome_name}
              onChange={(e) => setResthome_name(e.target.value)}
            ></input>
            <input
              type="text"
              className="form-input"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            ></input>
          </div>

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
            <input
              type="password"
              className="form-input"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <label for="isadmin">Is Admin</label>
            <input
              type="checkbox"
              className="form-input"
              label="Is Admin"
              id="isadmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></input>
          </div>
          <div className="input-container">
            <button type="submit" className="form-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AddStaffScreen;
