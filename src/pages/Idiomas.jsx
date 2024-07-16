import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import Card from '../componets/Card';
const API='https://restcountries.com/v3.1/all?fields=languages';
const API2='https://restcountries.com/v3.1/lang/'
const datosBase = "?fields=name,flags,capital,region,subregion,population";


import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from 'primereact/dropdown';


const Idiomas = () => {
  const [languages, setLanguages] = useState([]);
  const [languageCounts, setLanguageCounts] = useState({});
  const [datos, setDatos] = useState([]);
  const params = useParams();
  const idioma= params.idioma;
  const navigate = useNavigate();



  const getIdiomas = async () => {
    try {
      const response = await fetch(API);
      const countries = await response.json();

      const languagesSet = new Set();
      countries.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(language => {
            languagesSet.add(language);
          });
        }
      });
      const languagesList = Array.from(languagesSet).sort();
      setLanguages(languagesList);
      // Contar la frecuencia de cada idioma
      const languagesMap = new Map();
      countries.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(language => {
            if (languagesMap.has(language)) {
              languagesMap.set(language, languagesMap.get(language) + 1);
            } else {
              languagesMap.set(language, 1);
            }
          });
        }
      });
      setLanguageCounts(Object.fromEntries(languagesMap));
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  }
  const getDatos = async () => {
    const URI = API2 + idioma+ datosBase;
    try {
      const response = await fetch(URI);
      const data = await response.json();
      //console.log(data);
      setDatos(data);
     
    } catch (error) {
      console.error(error);
     
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getIdiomas();
    getDatos();
 
  }, [params.idioma]);
// para el autocompletado de idiomas
const [nombreIdioma, setNombreIdioma] = useState('');
const [xidioma, xsetIdioma] = useState([]);

const buscarIdioma = (event) => {
  xsetIdioma(languages.filter(item => item.toLowerCase().includes(event.query.toLowerCase()))
    .map(item => item));
};

if( Array.isArray(datos)===false){
  return(
    <div className="text-center">
      <h3 className="py-4">No se encontraron resultados para {params.idioma}</h3>
      <a href="#" className="btn btn-dark " onClick={() => navigate(-1)}>
        Volver
      </a>
    </div>
   
  )
}
console.log(languageCounts);
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-lg-2 '>
            <h4 className='text-center py-3 '>Lista de Idiomas</h4>
     
              <ul className='list-group ' data-bs-theme="dark">
                {languages.map((language, index) => (
                  <li key={index} className='list-group-item'><Link to={`/idiomas/${language}`} className='text-decoration-none' >
                    <div className='d-flex justify-content-between align-items-center'>
                      <div>{language} </div>
                      <div className="badge text-bg-info"> {languageCounts[language]}</div>
                    </div>
                    </Link>
                  </li>
                ))}
              </ul>
        

        </div>
        <div className='col-md-9 col-lg-10 '>
            <h4 className='text-center py-3 '>Lista de paises con el idioma {params.idioma} ({datos.length})</h4>

            <div className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                  <AutoComplete 
                  value={nombreIdioma} 
                  style={{ width: '100%' }} 
                  suggestions={xidioma} 
                  completeMethod={buscarIdioma} 
                  onChange={(e) => setNombreIdioma(e.value)} 
                  dropdown 
                  placeholder="Buscar por Idioma"
                  />
                  <Link to={`/idiomas/${nombreIdioma}`} href="#" className="btn btn-info btn-lg">Buscar</Link>
              </div>
              <hr/>
            </div>


            <div className="row">
            {datos.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Idiomas;
