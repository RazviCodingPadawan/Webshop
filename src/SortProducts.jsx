import { useStates } from './utilities/states';

export default function CategorySelector(props) {

  let s = useStates('main');
  let { bindTo, showAllOption } = props;
  let [bindObject, bindProperty] = bindTo;

  return <select {...bindObject.bind(bindProperty)}>
    {s.products.map(({ name, price }) =>
      <option key={name} value={name}>Namn</option>
      <option key={price} value={price}>Pris</option>
    )}
  </select>

}