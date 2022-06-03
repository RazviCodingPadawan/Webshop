import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from './CategorySelect';

export default function ProductDelete() {

  let s = useStates('main');
  let { id } = useParams();
  let navigate = useNavigate();

  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price } = product;

    async function deleteProduct() {
    // Delete from db
    await product.delete();
    // Navigate to detail page
    navigate(`/backoffice/delete`);

    
    window.location.reload(false);
  
    }

  return <Container>
    <Row><Col><h1>{name}</h1></Col></Row>
  
    <Row><Col><p>Pris: {price}</p></Col></Row>
    <Row><Col>
      <label className="mt-3">Namn:
        <input className="form-control" {...product.bind('name')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Beskrivning:
        <textarea className="form-control" {...product.bind('description')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Pris:
        <input type="number" className="form-control" {...product.bind('price')} />
      </label>
    </Col></Row>
    <Row className="mt-4"><Col>
      <label>
        Kategori:&nbsp;
        <CategorySelect bindTo={[product, 'categoryId']} />
      </label>
    </Col></Row>
    <button type="button" onClick={deleteProduct} className="my-4 btn_login float-end">Radera</button>
  </Container>
}