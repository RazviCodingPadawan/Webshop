import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
import {AddLike} from './components/AddLike'
// import {Favorites} from './components/Favorites'
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
    <Row><Col><h1 className='product_name'>PRODUKTER</h1></Col></Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    <Row>
      {s.products.filter(product =>
      s.chosenCategoryId === 0 /*alla*/
      || s.chosenCategoryId === product.categoryId
      ).map(({ id, name, price }) =>
      <Col xxl="4" md="3">
        <Container className="product">
          <Card className="product_items">
            <Col xxl="12" key={id} onClick={() => showDetail(id)}>
              {/* <Row className="favorites"><Favorites /></Row> */}
              <img onError={event => missingImage(event, name)} className="ms-3" style={{ width: 200, height: 200, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
              <h3 className="product_namn">{name}</h3>
            </Col>
            <Col xxl="12">
              <p className="pris_p"><b>Pris:</b> {sweFormat(price)}</p>
            </Col>
              <Row className="likes"><AddLike /></Row>
            </Card>
        </Container>
      </Col>
      
    )}
    </Row>
    
   
  </Container>
}