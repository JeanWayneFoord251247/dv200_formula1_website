import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/img/Frame 27 (1).png";
import "../App.css"; 
import { NavLink } from "react-router-dom"; 

function navBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="transparent" data-bs-theme="dark" className="Custom-NavBar">
      <Container fluid className="Contain-Fluid">
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto gap-5">
          <NavLink className="nav-button" to="/">Home</NavLink>
          <NavLink className="nav-button" to="/Compare">Compare</NavLink>
          <NavLink className="nav-button" to="/Timeline">Timeline</NavLink>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navBar;