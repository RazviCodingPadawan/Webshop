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
    <h1>Create new product</h1>
    <Link to="/backoffice">back to backoffice</Link>
  </Container>
}