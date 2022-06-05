import { useStates } from './utilities/states';
import { captureImage, initializeMedia, uploadPicture } from './utilities/imageCapture2';
import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './Create.css'
import { useNavigate, Link } from 'react-router-dom';

const Create = () => {

  let s = useStates('main');
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name');

  const [mobilData, setMobilData] = useState({
    categoryId: 1, // Do not hard code? Let the user choose?
    name: "",
    description: "",
    price: 0
  });

  const handleInputData = e => {
    setMobilData(data => ({
      ...data,
      [e.target.name]: e.target.value
    }))
  }

  const SubmitData = async e => {
    e.preventDefault()
    let result = await (await fetch('/api/products', {
      method: "POST",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(mobilData),
    })).json();
    navigate(`/backoffice`);
    window.location.reload(false);
    console.log(result)

  }
  
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

    async function save() {
    // Save to db
    await product.save();
    // Upload image if the image should be replaced
   await uploadPicture(id);
    // Navigate to detail page
    navigate(`/product-detail/${id}`);
  }


  function takeImage() {
    captureImage();
    l.captureMode = false;
  }
    



  return (
    <Container className="product-create">
      <Button className="btn_login delete_btn"><Link to="/backoffice">⦑ Bakåt</Link></Button>
      <Form className='shadow-lg p-3 mb-5 bg-white rounded capture' onSubmit={SubmitData}>
        <label className='create_label'>Namn</label>
        <input className='create_input' value={mobilData.name} name="name" onChange={handleInputData} placeholder='Namn' />

        <label className='create_label'>Beskrivning</label>
        <input className='create_input' value={mobilData.description} name="description" onChange={handleInputData} placeholder='Beskrivning' />

        <label className='create_label'>Pris</label>
        <input className='create_input' value={mobilData.price} name="price" onChange={handleInputData} placeholder='Pris' />

        <video style={{ display: l.captureMode ? 'block' : 'none' }} autoPlay></video>
        <canvas width="320" height="240" style={{ display: !l.captureMode ? 'block' : 'none' }}></canvas>
        <button className='btn btn-primary mt-3 mb-5' onClick={takeImage}>Ta bild</button>

        <Button className="btn_login create" type='submit' onClick={save} onSubmit={SubmitData}>SKAPA</Button>
      </Form>
    </Container>
  )
}

export default Create