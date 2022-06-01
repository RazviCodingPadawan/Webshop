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

  return <Container>
    <Row><h1>EDIT PAGE</h1></Row>
    <Row className="btn btn-visa"><Link to="/backoffice">back ...</Link></Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
        <Col className="product_edit_card">
            <Col className="edit_col">
              <Row><h3 className="h3_edit">{name}</h3></Row>
              <Row><img className="img_edit" onError={event => missingImage(event, name)} style={{ width: 300, height: 300, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} /></Row>
            </Col>
            <Row><p>{description}</p></Row>
            <Col className="col_price">
                <Row><button className="btn_login edit_content" key={id} onClick={() => showDetail(id)}>EDIT</button></Row>
                <Row><p className="p_edit"><b>Pris:</b> {sweFormat(price)}</p></Row></Col>
            </Col>
    )}
  </Container>
}