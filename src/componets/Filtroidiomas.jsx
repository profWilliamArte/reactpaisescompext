
import { Link } from "react-router-dom";
import idiomas from "../datos/idiomas.json";
const Filtroidiomas = () => {
  return (
    <>
        {idiomas && idiomas.map((item, index) => (
          
            <li key={index}><Link to={`/inicio/${item.language}`} className="dropdown-item" href="#"> {item.languageEsp}</Link></li>
           
        
        ))}
            
    </>
  )
}

export default Filtroidiomas