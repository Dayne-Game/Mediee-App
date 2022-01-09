import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { register } from "../../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [image, setImage] = useState(""); // profile_image
  const [resthome_name, setResthome_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

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
      setMessage("Password do not match");
    } else {
      dispatch(register(fname, lname, image, resthome_name, email, password));
    }
  };

  return (
    <div className="container-fluid">
      <div className="flex-container">
        <div className="split-2"></div>
        <div className="split-1">
          <form onSubmit={submitHandler} className="form-container">
            <div className="form-title-box">
              <h2 className="form-title">Create Account</h2>
            </div>
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
              <button type="submit" className="form-button">
                Submit
              </button>
            </div>
            <p className="form-subtitle text-center mt-2">
              Already have an account? Login{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                HERE
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
