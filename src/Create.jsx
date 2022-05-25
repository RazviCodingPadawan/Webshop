
import { Container, Row, Col } from 'react-bootstrap';
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Create() {

  scrollRestore();

  return <Container className="productList">
    <h1>Create new product</h1>
    <Link to="/backoffice">back to backoffice</Link>
    <Row><Col><label className="mt-3">Namn<input className="form-control"></input></label></Col></Row>
    <Row><Col><label className="mt-3">Beskrivning<textarea className="form-control"></textarea></label></Col></Row>
    <Row><Col><label className="mt-3">Pris<input type="number" className="form-control"></input></label></Col></Row>
    <Row className="mt-4"><Col><label>Kategori:</label></Col></Row>
    <button type="button" className="my-4 btn btn-primary float-end">Spara</button>
  </Container>
}