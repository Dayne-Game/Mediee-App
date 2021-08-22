import React, { useEffect } from "react";
// import { Table, Form, Button, Row, Col } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import { getUserDetails } from "../../actions/userActions";
import { Fragment } from "react";

const StaffProfileScreen = ({ match, history }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (!user || !user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      }
    } else {
      history.push(`/login`);
    }
  }, [dispatch, history, userInfo, userId, user]);

  return <Fragment>{loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <h1>{user.name}</h1>}</Fragment>;
};

export default StaffProfileScreen;
