import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
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
    <Row><Col><h1>PRODUKTER</h1></Col></Row>
    <Row className="mb-4"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Row className="product" key={id} onClick={() => showDetail(id)}>
        <Card>
          <Col ml="12">
            <h3>{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 300, height: 300, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col ml="12">
            <p><b>Pris:</b> {sweFormat(price)}</p>
          </Col>
        </Card>
      </Row>
    )}
  </Container>
}