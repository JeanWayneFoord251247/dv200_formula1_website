import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/img/Frame 27 (1).png";
import "../App.css";

function ColorSchemesExample() {
  return (
    <Navbar bg="transparent" data-bs-theme="dark" className="Custom-NavBar">
      <Container fluid className="Contain-Fluid">
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>

        <Nav className="ms-auto gap-5">
          <Nav.Link href="#home" className="nav-button">Compare</Nav.Link>
          <Nav.Link href="#features" className="nav-button">Timeline</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
