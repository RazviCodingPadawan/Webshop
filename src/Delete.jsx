import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
import { Link } from "react-router-dom";
import './Delete.css'

export default function Delete() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-delete/${id}`);
  }

  return <Container>
    <Row><h1>PRODUKTER</h1></Row>
    <Row className="btn_login delete_btn"><Link to="/backoffice">⦑ Back</Link></Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Col>
          <Col className="product-detail-container">
            <h3 className="h3_delete">{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 300, height: 300, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col className="product_price_btn">
            <Row className="p_delete"><p><b>Pris:</b> {sweFormat(price)}</p></Row>
            <Row><button type="button" key={id} onClick={() => showDetail(id)} className="btn_login btn btn-visa">Redigera</button></Row>
          </Col>
      </Col>
    )}
  </Container>
}