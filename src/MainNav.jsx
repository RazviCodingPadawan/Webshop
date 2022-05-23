import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './MainNav.css'
import Logo from "./images/LOGO.png";

import {useStates} from './utilities/states';
//import ShoppingCart from './ShoppingCart';

export default function MainNav() {

  let s = useStates('main');

  //let totalNumberOfProductsInCart = s.cartContents.reduce((acc,{quantity}) => acc + quantity,0);

  let totalNumberOfProductsInCart = 0;
  // loop through each row in the shopping cart
  // add the quantity per row to totalNumberOfProductsInCart
  for(let cartRow of s.cartContents){
    totalNumberOfProductsInCart += cartRow.quantity;
    console.log('name',cartRow.product.name,'quantity', cartRow.quantity, 'totalNumber...',totalNumberOfProductsInCart)
  }

  // React Router DOM v6 got rid of the NavLink component
  // What is the smartest way to recreate that functionality
  // (adding an active CSS class to the active menu choice)

  return <Navbar className="navbar">
    <Container>
      <Navbar.Brand className="logo_text" href="#home"><img src={Logo}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-link hem" to="/">Hem</Link>
          <Link className="nav-link products" to="/product-list">Produkter</Link>
          <Link className="nav-link products" to="/backoffice">Backoffice</Link>
        </Nav>
        <Link className="nav-link" to="/shopping-cart"><button className="cart">🛒 {totalNumberOfProductsInCart}</button></Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

