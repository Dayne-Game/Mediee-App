import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table } from "react-bootstrap";
import { listStaff } from "../../actions/userActions";
import Message from "../../components/Message/Message";
import Loader from "../../components/loader/Loader";

const StaffScreen = ({ history }) => {
  const dispatch = useDispatch();

  const staffList = useSelector((state) => state.staffList);
  const { loading, error, users } = staffList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listStaff());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  console.log(users);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Card>
            <Card.Header as="h3">Staff Members</Card.Header>
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>DELETE</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Fragment>
      )}
    </>
  );
};

export default StaffScreen;
