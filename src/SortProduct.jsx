import { useStates } from './utilities/states';

export default function SortProduct() {

  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('albums');
  useEffect(() => {
    const sortArray = type => {
      const types = {
        country: 'country',
        collection: 'collection',
        releasedOn: 'releasedOn',
      };
      const sortProperty = types[type];
      const sorted = [...movies].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setData(sorted);
    };
    sortArray(sortType);
  }, [sortType]);

    return (
    <div className="App">
      <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="country">Country</option>
        <option value="collection">Collection</option>
        <option value="releasedOn">Release Date</option>
      </select>
      {data.map(movie => (
        <div key={movie.id} style={{ margin: '30px' }}>
          <div>{`Movie: ${movie.name}`}</div>
          <div>{`Country: ${movie.country}`}</div>
          <div>{`Collection: ${movie.collection}`}</div>
          <div>{`Year of Release: ${movie.releasedOn}`}</div>
        </div>
      ))}
    </div>
  );
}


