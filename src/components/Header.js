import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();

  if (!user) return <></>;

  const getLinkClass = (path) =>
    location.pathname === path
      ? "btn btn-primary text-white fw-bold" // Selected state
      : "btn btn-success text-white fw-bold"; // Default state

  return (
    <header style={{ margin: "20px 0px" }}>
      <Navbar
        variant="light"
        expand="sm"
        collapseOnSelect
        style={{
          background: "#ffffff",
          color: "#000",
          width: "100%",
          minHeight: "5vh",
          margin: "0",
        }}
      >
        <Container>
          {/* Brand/logo with link to home */}
          <Link to="#" className="text-decoration-none">
            <Navbar.Brand>
              <img
                src={logo}
                height={40}
                alt="Medrevn LLC"
                style={{ width: "100px" }}
              />
            </Navbar.Brand>
          </Link>

          {/* Navigation links */}
          <Nav className="mw-25 h-[20px] mx-auto d-flex gap-3 align-items-center">
            <Link to="/time" className={getLinkClass("/time")}>
              Attendance
            </Link>
            <Link to="/leave" className={getLinkClass("/leave")}>
              Leaves
            </Link>
            <Link to="/admin" className={getLinkClass("/admin")}>
              Admin
            </Link>
            <Link to="/performance" className={getLinkClass("/performance")}>
              Time
            </Link>
            <Link to="/status" className={getLinkClass("/status")}>
              Status
            </Link>
          </Nav>

          {/* User authentication links */}
          {user ? (
            <>
              <span className="d-flex align-items-center text-dark fw-bold">
                <FaUser className="me-2" />
                {user.name}
              </span>
              <button
                onClick={logoutUser}
                className="btn btn-link text-decoration-none text-dark"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-dark text-decoration-none d-flex align-items-center"
            >
              <FaUser className="me-2" />
              Login
            </Link>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
