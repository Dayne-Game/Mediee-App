import React, { useState, useEffect, Fragment } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import FormContainer from "../../components/FormContainer/FormContainer";
import { createResident } from "../../actions/residentActions";
import { RESIDENT_CREATE_RESET } from "../../constants/residentConstants";
import { Link } from "react-router-dom";

const AddResidentScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [nhi, setNhi] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodtype, setBloodtype] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const residentCreate = useSelector((state) => state.residentCreate);
  const { loading, error, success } = residentCreate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (success) {
        dispatch({ type: RESIDENT_CREATE_RESET });
        history.push("/residents");
      }
    } else {
      history.push("/login");
    }
  }, [history, userInfo, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createResident(name, nhi, dob, gender, height, weight, bloodtype));
  };

  return (
    <Fragment>
      <Link to="/residents" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Add Resident</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
          </Form.Group>

          <Form.Group controlId="nhi" className="mb-2">
            <Form.Label>NHI Number</Form.Label>
            <Form.Control type="text" placeholder="Enter NHI" minLength="7" maxLength="7" value={nhi} onChange={(e) => setNhi(e.target.value)} required></Form.Control>
          </Form.Group>

          <Form.Group controlId="dob" className="mb-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="Enter Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} required></Form.Control>
          </Form.Group>

          <Form.Group controlId="gender" className="mb-2">
            <Form.Label>Gender</Form.Label>
            <select className="form-select form-control" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </Form.Group>

          <Form.Group controlId="height" className="mb-2">
            <Form.Label>Height</Form.Label>
            <Form.Control type="number" placeholder="Enter Height" value={height} onChange={(e) => setHeight(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="weight" className="mb-2">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" placeholder="Enter Weight" value={weight} onChange={(e) => setWeight(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="bloodtype" className="mb-3">
            <Form.Label>Bloodtype</Form.Label>
            <Form.Control type="text" placeholder="Enter Bloodtype" value={bloodtype} onChange={(e) => setBloodtype(e.target.value)}></Form.Control>
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" className="login-submit-button">
              Add Resident
            </Button>
          </div>
        </Form>
      </FormContainer>
    </Fragment>
  );
};

export default AddResidentScreen;
