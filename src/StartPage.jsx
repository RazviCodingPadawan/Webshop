import './StartPage.css'
import 'animate.css';
import Footer from './Footer/Footer'

export default function StartPage() {
  return <div className="main_container">
            <h1 class="animate__animated animate__wobble animate__slower	3s main_text">Phonehub!<br></br><span>”Connect with the world”</span></h1>
        <div>
          <Footer />
        </div>
  </div>
}