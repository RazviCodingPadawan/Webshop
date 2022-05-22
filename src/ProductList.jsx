import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
import {AddLike} from './components/AddLike'
import './ProductList.css'

export default function ProductList() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  function buy() {
    // Add the product to the cart
    add(product, localState.buyQuantity);
    // Show the cart
    navigate('/shopping-cart');
  }

  

  return <Container className="productList">
    <Row><Col><h1>PRODUKTER</h1></Col></Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    <Row>
      {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
      ).map(({ id, name, description, price }) =>
        <Col xxl="3" md="4">
          <div className="product">
        <Card className="product_items">
          <Col xxl="12" key={id} onClick={() => showDetail(id)}>
            <h3 className="product_namn">{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 200, height: 200, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />

          </Col>
          <Col xxl="12">
            <p className="pris_p"><b>Pris:</b> {sweFormat(price)}</p>
          </Col>
            <div className="likes"><AddLike /></div>
        </Card>
      </div>
      </Col>
      
    )}
    </Row>
    
   
  </Container>
}