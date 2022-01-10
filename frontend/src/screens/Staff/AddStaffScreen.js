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
          email,
          password,
          role,
          resthome_name,
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
      </div>
    </Fragment>
  );
};

export default AddStaffScreen;
