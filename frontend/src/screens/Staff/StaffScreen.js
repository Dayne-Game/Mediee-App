import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Nav } from "react-bootstrap";
import { listStaff, deleteUser } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";
import { Link, Route } from "react-router-dom";
import Searchbox from "../../components/SearchBox/Searchbox";

const StaffScreen = ({ history, match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const staffList = useSelector((state) => state.staffList);
  const { loading, error, users } = staffList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listStaff(keyword));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, keyword, successDelete, userInfo]);

  console.log(users);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Nav style={{ marginBottom: "30px", marginTop: "20px" }}>
            <Nav.Item style={{ marginRight: "10px" }}>
              <h3>Staff Members</h3>
            </Nav.Item>
            <Nav.Item>
              <Link to="/staff/add" className="btn btn-secondary">
                Add Staff
              </Link>
            </Nav.Item>
          </Nav>
          <Route render={({ history }) => <Searchbox history={history} />} />
          {users.length === 0 ? (
            <p>No Users Found</p>
          ) : (
            <Fragment>
              <p>Total number of users: {users.length}</p>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Link to={`/staffprofile/${user._id}`}>{user.name}</Link>
                      </td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                      <td>
                        <Link to={`/staff/edit/${user._id}`} className="btn-sm btn btn-info" style={{ marginRight: "10px" }}>
                          Edit
                        </Link>
                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Fragment>
          )}
        </Fragment>
      )}
    </>
  );
};

export default StaffScreen;
