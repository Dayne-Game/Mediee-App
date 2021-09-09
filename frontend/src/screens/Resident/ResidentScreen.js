import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Nav, Card } from "react-bootstrap";
import { Route } from "react-router-dom";
import { listResidents, deleteResident } from "../../actions/residentActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Paginate from "../../components/Pagination/Paginate";
import ResidentSearchBox from "../../components/ResidentSearchBox/ResidentSearchBox";

const ResidentScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const residentList = useSelector((state) => state.residentList);
  const { loading, error, residents, page, pages } = residentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const residentDelete = useSelector((state) => state.residentDelete);
  const { success: successDelete } = residentDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listResidents(keyword, pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, keyword, pageNumber, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      dispatch(deleteResident(id));
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Card>
          <Fragment>
            <Card.Header>
              <div className="d-flex justify-content-between">
                <Nav className="me-auto d-flex align-items-center">
                  <Nav.Item style={{ marginRight: "10px", lineHeight: "50px" }}>
                    <h3 style={{ paddingTop: "8px" }}>Residents</h3>
                  </Nav.Item>
                  {userInfo && userInfo.isAdmin && (
                    <Nav.Item>
                      <Link to="/resident/add" className="btn btn-info">
                        Add Resident
                      </Link>
                    </Nav.Item>
                  )}
                </Nav>
                <Route render={({ history }) => <ResidentSearchBox history={history} />} />
              </div>
            </Card.Header>
            <Card.Body>
              {residents.length === 0 ? (
                <p>There are no residents</p>
              ) : (
                <Fragment>
                  <p>Number of Residents: {residents && residents.length}</p>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>NHI</th>
                        <th>Date of Birth</th>
                        <th>DATE CREATED</th>
                        {userInfo && userInfo.isAdmin && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {residents.map((resident) => (
                        <tr key={resident._id}>
                          <td>
                            <Link to={`/residentprofile/${resident._id}`}>{resident.name}</Link>
                          </td>
                          <td>{resident.nhi}</td>
                          <td>
                            <Moment format="DD-MM-YYYY">{resident.dob}</Moment>
                          </td>
                          <td>
                            <Moment format="DD-MM-YYYY">{resident.date}</Moment>
                          </td>
                          {userInfo && userInfo.isAdmin && (
                            <td>
                              <Link to={`/resident/edit/${resident._id}`} className="btn-sm btn btn-info" style={{ marginRight: "10px" }}>
                                Edit
                              </Link>
                              <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(resident._id)}>
                                DELETE
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paginate pages={pages} page={page} isAdmin={true} />
                </Fragment>
              )}
            </Card.Body>
          </Fragment>
        </Card>
      )}
    </Fragment>
  );
};

export default ResidentScreen;
