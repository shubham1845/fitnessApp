import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AppNavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container>
        <Navbar.Brand href="#home">Fitness Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="nav-link">
              Home
            </Nav.Link>
            {token ? (
              <>
                <Nav.Link as={NavLink} to="/workouts" className="nav-link">
                  Workouts
                </Nav.Link>
                <Nav.Link as={NavLink} to="/add-workout" className="nav-link">
                  Add Workout
                </Nav.Link>
              </>
            ) : null}
          </Nav>

          <Nav>
            {token ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="nav-link">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
