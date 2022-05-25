import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  return <Container className="productList">
    <h1>Create new product</h1>
    <Link to="/backoffice">back to backoffice</Link>
    <Row><Col><label className="mt-3">Namn<input className="form-control"></input></label></Col></Row>
    <Row><Col><label className="mt-3">Beskrivning<textarea className="form-control"></textarea></label></Col></Row>
    <Row><Col><label className="mt-3">Pris<input type="number" className="form-control"></input></label></Col></Row>
    <button type="button" className="my-4 btn btn-primary float-end">Spara</button>
  </Container>
}