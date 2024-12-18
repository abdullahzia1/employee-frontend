import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <header style={{ margin: "20px 0px" }}>
      {/* Bootstrap Navbar */}
      <Navbar
        variant="light"
        expand="sm"
        collapseOnSelect
        style={{
          background: "#ffffff",
          color: "#0000",
          width: "100%",
          minHeight: "5vh",
          margin: "0",
        }}
      >
        <Container style={{ margin: "auto" }}>
          {/* Brand/logo with link to home */}
          <Link to="#" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                src={logo}
                height={40}
                alt="Medrevn LLC"
                style={{ width: "100px" }}
              />
            </Navbar.Brand>
          </Link>

          {/* Navbar toggle button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navbar content */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="lg-d-flex justify-content-between"
          >
            {/* Navigation links */}
            <Nav className="ms-auto">
              {/* User authentication links */}
              {user ? (
                // If user is authenticated
                <>
                  <Link
                    to="/profile"
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      marginRight: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FaUser style={{ marginRight: "5px" }} />
                    {user.name}
                  </Link>

                  {/* Logout button */}
                  <button
                    onClick={logoutUser}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#000000",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If user is not authenticated, show login link
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaUser style={{ marginRight: "5px" }} />
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
