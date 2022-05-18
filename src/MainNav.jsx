import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './MainNav.css'


export default function MainNav() {

  // React Router DOM v6 got rid of the NavLink component
  // What is the smartest way to recreate that functionality
  // (adding an active CSS class to the active menu choice)

  return <Navbar className="navbar">
    <Container>
      <Navbar.Brand className="logo_text" href="#home">EARN</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-link hem" to="/">Hem</Link>
          <Link className="nav-link products" to="/product-list">Produkter</Link>
        </Nav>
        <Link className="nav-link" to="/shopping-cart"><button className="cart">Shopping vagn</button></Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}