
import { Container } from 'react-bootstrap';
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  return <Container className="productList_backoffice">
    <div className="backoffice_container">
      <h1>Welcome to backoffice</h1>
      <h3>The place where shit happens 💩</h3>
      <div className="links_backoffice">
        <Link className="backoffice_link" to="/backoffice/edit">Edit</Link>
        <Link className="backoffice_link" to="/backoffice/create">Create</Link>
        <Link className="backoffice_link" to="/backoffice/delete">Delete</Link>
      </div>
    </div>
  </Container>
}