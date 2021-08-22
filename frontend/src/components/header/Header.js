import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./style.css";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className="color-nav" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Mediee</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo ? (
              <Fragment>
                <Nav className="me-auto">
                  <Fragment>
                    <LinkContainer to="/dashboard">
                      <Nav.Link>Dashboard</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/residents">
                      <Nav.Link>Residents</Nav.Link>
                    </LinkContainer>
                    {userInfo && userInfo.isAdmin && (
                      <LinkContainer to="/staff">
                        <Nav.Link>Staff</Nav.Link>
                      </LinkContainer>
                    )}
                  </Fragment>
                </Nav>
                <Nav className="ms-auto">
                  <Nav.Item>
                    <Nav.Link onClick={logoutHandler}>
                      <i className="fas fa-sign-out-alt" /> <span className="hide-sm">{userInfo.name}</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Fragment>
            ) : (
              <Nav className="ms-auto">
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
