import { useStates } from './utilities/states';
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-edit/${id}`);
  }

  return <Container className="productList">
    <h1>Welcome to backoffice</h1>
    <h3>The place where shit happens</h3>
    <Link to="/backoffice/edit">Edit</Link>
  </Container>
}