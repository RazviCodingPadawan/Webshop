
   
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

const Create = () => {

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
      body: JSON.stringify(horseData)
    })).json();
    console.log(result)
  }

  return (
    <div className='productList'>
      <Form onSubmit={SubmitData}>
        <label>Namn</label>
        <input value={mobilData.name} name="name" onChange={handleInputData} placeholder='Namn' />

        <label>Beskrivning</label>
        <input value={mobilData.description} name="description" onChange={handleInputData} placeholder='Beskrivning' />

        <label>Pris</label>
        <input value={mobilData.price} name="price" onChange={handleInputData} placeholder='Pris' />

        <Button type='submit'>Create</Button>
      </Form>
    </div>
  )
}

export default Create
