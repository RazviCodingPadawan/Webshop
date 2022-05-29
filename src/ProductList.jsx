import { useStates } from './utilities/states';
import {useState} from 'react';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name');

  // Search is called below (in the jsx/html) as a filter 
  // for the product list...
  // Return true for every product we want to keep/show
  // return false if you do not want to keep it
  function search(product){
     return product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ||  product.description.toLowerCase().includes(searchTerm.toLowerCase());
  }

  // Called below (in the jsx/html)
  function sortOurProducts(productA, productB){
    if(sortOrder === 'name'){
      return productA.name > productB.name ? 1 : -1;
    }
    if(sortOrder === 'priceAsc'){
      return productA.price > productB.price ? 1 : -1;
    }
    if(sortOrder === 'priceDesc'){
      return productA.price < productB.price ? 1 : -1;
    }
  }

  return <Container className="product_list">
    <Row><Col><h1>Produkter</h1></Col></Row>
      
    <Row>
        <Col className="search_select">
            <select className="search_price" value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
              <option value="name">Namn</option>
              <option value="priceAsc">Pris (stigande)</option>
              <option value="priceDesc">Pris (fallande)</option>
            </select>
            <CategorySelect className="search_id" showAllOption bindTo={[s, 'chosenCategoryId']} />
            <input className="search_input" type="text" placeholder='🪕search' value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        </Col>
      </Row>
      <Row>
              {s.products.filter(product =>
              s.chosenCategoryId === 0 /*alla*/
              || s.chosenCategoryId === product.categoryId
              ).filter(search).sort(sortOurProducts).map(({ id, name, price }) =>
      <Col>
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
              <Row><button type="button" onClick={buy} className="btn_buy">KÖP</button></Row>
              <Row className="likes"><AddLike /></Row>
            </Card>
        </Container>
      </Col> 
      )}    
    </Row>

  </Container>
}