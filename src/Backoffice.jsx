import { useStates } from './utilities/states';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  return <Container className="productList">
 
    <h1>Welcome to backoffice</h1>
    <h3>The place where shit happens 💩</h3>
    <Link to="/backoffice/edit">Edit</Link>
    <Link to="/backoffice/create">Create</Link>
    <Link to="/backoffice/delete">Delete</Link>
  </Container>
}