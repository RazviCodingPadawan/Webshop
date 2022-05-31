
 
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CategorySelect from './CategorySelect';
import { useStates } from './utilities/states';
import axios from 'axios'
import './Create.css'

const Create = () => {

  let s = useStates('main');
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
      body: JSON.stringify(mobilData)
    })).json();
    console.log(result)
  }

  return (
    <div className='create_product'>
        

      <Form className='shadow-lg p-3 mb-5 bg-white rounded' onSubmit={SubmitData}>
      <CategorySelect className="search_id" showAllOption bindTo={[s, 'chosenCategoryId']} />
            <input className="search_input" type="text" placeholder='Search' value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
        <label className='create_label'>Namn</label>
        <input className='create_input' value={mobilData.name} name="name" onChange={handleInputData} placeholder='Namn' />

        <label className='create_label'>Beskrivning</label>
        <input className='create_input' value={mobilData.description} name="description" onChange={handleInputData} placeholder='Beskrivning' />

        <label className='create_label'>Pris</label>
        <input className='create_input' value={mobilData.price} name="price" onChange={handleInputData} placeholder='Pris' />

        <Button className="btn_login create" type='submit'>CREATE</Button>
      </Form>
    </div>
  )
}

export default Create
