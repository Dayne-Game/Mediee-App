import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Nav } from "react-bootstrap";
import { listResidents } from "../../actions/residentActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import { Link, Route } from "react-router-dom";
import Moment from "react-moment";

const ResidentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const residentList = useSelector((state) => state.residentList);
  const { loading, error, residents } = residentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listResidents());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Nav style={{ marginBottom: "30px", marginTop: "20px" }}>
            <Nav.Item style={{ marginRight: "10px" }}>
              <h3>Residents</h3>
            </Nav.Item>
            <Nav.Item>
              <Link to="/residents/add" className="btn btn-secondary">
                Add Resident
              </Link>
            </Nav.Item>
          </Nav>
          {residents.length === 0 ? (
            <p>No Residents Found</p>
          ) : (
            <Fragment>
              <p>Total number of users: {residents.length}</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>NHI</th>
                    <th>Date of Birth</th>
                    <th>DATE CREATED</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident) => (
                    <tr key={resident._id}>
                      <td>
                        <Link to={`/staffprofile/${resident._id}`}>
                          {resident.name}
                        </Link>
                      </td>
                      <td>{resident.nhi}</td>
                      <td>
                        <Moment format="DD-MM-YYYY">{resident.dob}</Moment>
                      </td>
                      <td>
                        <Moment format="DD-MM-YYYY">{resident.date}</Moment>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResidentScreen;
