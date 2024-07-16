import { Link } from "react-router-dom"
import { useNavigate} from 'react-router-dom';
import logo from "../assets/logo4.jpg"
import { useState } from "react";


import Filtroidiomas from "./Filtroidiomas";
const Header = () => {

  const [txtbuscar, setTxtbuscar] = useState('');

  const menejoTxt = (event) => {
      setTxtbuscar(event.target.value);
  };
  
  const navigate = useNavigate();
  const manejoEnvio = (event) => {
      event.preventDefault();
      navigate('/inicio', {
        state: txtbuscar,
      });	
      
    };
  



  return (
    <nav className="navbar navbar-expand-lg bg-menu fs-5 fixed-top shadow" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><img src={logo} alt="" width={250} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/inicio"} className="nav-link active" aria-current="page" href="#">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to={"/tablas"} className="nav-link active" aria-current="page" href="#">Tabla</Link>
            </li>
            <li className="nav-item">
              <Link to={"/idiomas/English"} className="nav-link active" aria-current="page" href="#">Idioma</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Continentes
              </a>
              <ul className="dropdown-menu">
                <li><Link to={"/inicio/all"} className="dropdown-item" href="#">All</Link></li>
                <li><Link to={"/inicio/asia"} className="dropdown-item" href="#">Asia</Link></li>
                <li><Link to={"/inicio/africa"} className="dropdown-item" href="#">Africa</Link></li>
                <li><Link to={"/inicio/america"} className="dropdown-item" href="#">America</Link></li>
                <li><Link to={"/inicio/europe"} className="dropdown-item" href="#">Europe</Link></li>
                <li><Link to={"/inicio/oceania"} className="dropdown-item" href="#">Oceania</Link></li>
              </ul>
            </li>



    

          </ul>
          <form className="d-flex" role="search" onSubmit={manejoEnvio}>
            <input value={txtbuscar} onChange={menejoTxt} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

  )
}

export default Header