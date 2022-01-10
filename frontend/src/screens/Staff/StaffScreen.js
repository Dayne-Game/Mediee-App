import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStaff, deleteUser } from "../../actions/userActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
// import Searchbox from "../../components/Searchbox";

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
    if (window.confirm("Are you sure? This can't be undone.")) {
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
          <Sidebar />
          <div className="container-minus-sidebar">
            <div className="title-bar">
              <h1>Staff Members</h1>
              <div className="container-flex">
                <img
                  src={userInfo.profile_image}
                  alt="Profile"
                  className="user-image"
                />
                {userInfo ? (
                  <div className="user-text-box">
                    <p className="user-name">
                      {userInfo.fname} {userInfo.lname}
                    </p>
                    <p className="user-tagline">{userInfo.role}</p>
                  </div>
                ) : (
                  <p>Not logged in</p>
                )}
              </div>
            </div>
            <div style={{ paddingLeft: "10px" }}>
              {users.length === 0 ? (
                <p>No Staff Members Found</p>
              ) : (
                <Fragment>
                  <p>Number of Staff Members: {users.length}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Role</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => {
                        <tr key={user._id}>
                          <td>
                            <img
                              src={user.profile_image}
                              alt={user.profile_image}
                              className="table-profile-image"
                            />
                            <span className="line-one">
                              <Link to={`/staffprofile/${user._id}`}>
                                {user.fname} {user.lname}
                              </Link>
                            </span>
                            <span className="line-two">{user.email}</span>
                          </td>
                          <td>
                            <span className="line-one">{user.role}</span>
                            <span className="line-two">
                              {user.resthome_name}
                            </span>
                          </td>
                          <td>
                            {user.isAdmin ? (
                              <span className="role admin">Admin</span>
                            ) : (
                              <span className="role user">User</span>
                            )}
                          </td>
                          <td>
                            <Link
                              to={`/staff/edit/${user._id}`}
                              style={{ color: "skyblue", marginRight: "10px" }}
                            >
                              edit
                            </Link>
                            <Link
                              to="#"
                              onClick={() => deleteHandler(user._id)}
                            >
                              DELETE
                            </Link>
                          </td>
                        </tr>;
                      })}
                    </tbody>
                  </table>
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default StaffScreen;
