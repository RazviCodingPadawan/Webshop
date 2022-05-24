import { useState, useEffect } from './utilities/states';

export default function SortProduct() {

  const [data, setData] = useState('main');
  const [sortType, setSortType] = useState('main');
  useEffect(() => {
    const sortArray = type => {
      const types = {
        name: 'name',
        price: 'price',
      };
      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

    return (
      <div className="App">
        <p>Sortera efter:</p>
      <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="name">Namn</option>
        <option value="price">Pris</option>
      </select>
      {data.map(products => (
        <div key={products.id} style={{ margin: '30px' }}>
          <div>{`Namn: ${products.name}`}</div>
          <div>{`Pris: ${products.price}`}</div>
        </div>
      ))}
    </div>
  );
}


