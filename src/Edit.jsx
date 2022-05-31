import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
import { Link } from "react-router-dom";
import './Edit.css'

export default function Edit() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-edit/${id}`);
  }

  return <Container className="product_edit" xxl="12">
    <Row className="product_edit_row">
      <Col><h1>EDIT PAGE</h1></Col>
      <Col className="btn_login edit_btn"><Link to="/backoffice">back to backoffice</Link></Col>
    </Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Row className="product">
        <Col className="product_edit_card">
          <Col xxl="12">
            <h3 className="edit_h3">{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 300, height: 300, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
            <Row><button class="btn_login edit_content" key={id} onClick={() => showDetail(id)}>EDIT</button></Row>
          </Col>
          <Col xxl="12">
            <p><b>Pris:</b> {sweFormat(price)}</p>
          </Col>
        </Col>
      </Row>
    )}
  </Container>
}