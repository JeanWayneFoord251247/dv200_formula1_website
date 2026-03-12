import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../Assets/img/Frame 27 (1).png";
import "../App.css";
import { Link } from "react-router-dom"; 

function ColorSchemesExample() {
  return (
    
    <Navbar bg="transparent" data-bs-theme="dark" className="Custom-NavBar">
      <Container fluid className="Contain-Fluid">
        
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" height="50" />
        </Navbar.Brand>

        <Nav className="ms-auto gap-5">
          <Link className="nav-button" to="/Compare">Compare</Link>
          <Link className="nav-button" to="/Timeline">Timeline</Link>
        </Nav>
        
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;