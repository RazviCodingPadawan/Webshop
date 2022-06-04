
import { Container } from 'react-bootstrap';
import { scrollRestore } from './utilities/scrollBehavior';
import { Link } from "react-router-dom";

import './ProductList.css'
import './Backoffice.css'

export default function Backoffice() {

  scrollRestore();

  return <Container>
    <div className="backoffice_container">
      <h1>Välkommen till backoffice</h1>
      <h3>Där skiten händer 💩</h3>
      <div className="links_backoffice">
        <Link className="btn_login backoffice_link" to="/backoffice/create">Skapa ⦒</Link>
        <Link className="btn_login backoffice_link" to="/backoffice/edit">Ändra ⦒</Link>
        <Link className="btn_login backoffice_link" to="/backoffice/delete">Radera ⦒</Link>
      </div>
    </div>
  </Container>
}