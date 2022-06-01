import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from './CategorySelect';
import { captureImage, initializeMedia, uploadPicture } from './utilities/imageCapture';
import { useState } from 'react';
import './ProductEdit.css'

export default function ProductEdit() {

  let s = useStates('main');
  let { id } = useParams();
  let navigate = useNavigate();

  // a local state only for this component
  let l = useStates({
    captureMode: true,
    replaceImage: false
  })

  // initialize media (start talking to camera)
  // when the component loads
  useState(() => {
    initializeMedia();
  }, [])


  // find the correct product based on id
  let product = s.products.find(x => x.id === +id);
  if (!product) { return null; }
  let { name, description, price } = product;

  async function save() {
    // Save to db
    await product.save();
    // upload image if the image should be replaced
    l.replaceImage && await uploadPicture(id);
    // Navigate to detail page
    navigate(`/backoffice/edit`);
  }

  function takeImage() {
    captureImage();
    l.captureMode = false;
  }


  return <Container className="product_edit capture">
    {l.replaceImage ?
      <Row><Col>
        <video style={{ display: l.captureMode ? 'block' : 'none' }} autoPlay></video>
        <canvas width="300" height="240" style={{ display: !l.captureMode ? 'block' : 'none' }}></canvas>
        <button className='btn_login' onClick={(takeImage)}>Ta bild</button>
      </Col></Row> : <Row><Col>
        <img className='img_capture' src={`/images/products/${id}.jpg`} />
        <button className='btn_login' onClick={() => l.replaceImage = true}>Byt bilden</button>
      </Col></Row>} 
    <Row><Col><h1 className='edit_page_text'>{name}</h1></Col></Row>
    <Row><Col><p>{description}</p></Col></Row>
    <Row><Col><p>Pris: {price}</p></Col></Row>
    <Row><Col>
      <label className="mt-3">Skriva nytt Namn:
        <input className="form-control" {...product.bind('name')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Skriva nytt Beskrivning:
        <textarea className="form-control" {...product.bind('description')} />
      </label>
    </Col></Row>
    <Row><Col>
      <label className="mt-3">Pris:
        <input type="number" className="form-control" {...product.bind('price')} />
      </label>
    </Col></Row>
    <Row className="mt-3"><Col>
      <label>
        Välja Kategori:&nbsp;
        <CategorySelect bindTo={[product, 'categoryId']} />
      </label>
    </Col></Row>
    <button type="button" onClick={save} className="btn_login edit_save_btn">Spara</button>   
  </Container>
}
