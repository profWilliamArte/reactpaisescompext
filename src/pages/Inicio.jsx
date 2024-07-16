import { useEffect, useState } from "react";
import Card from "../componets/Card";
import { Link, useParams } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from 'primereact/dropdown';


const API = 'https://restcountries.com/v3.1/';
const datosBase = "?fields=name,flags,capital,region,subregion,population";

const Inicio = () => {
  const [datos, setDatos] = useState([]);
  const [status, setStatus] = useState(false)
  const params = useParams();
  const region= params.region;
  
  let URI="";
  let titulo="";

  if (region === undefined || region === 'all') {
    URI = API + "all" + datosBase;
    titulo = "Todos los paises";
  } else {
    URI = API + "region/" + region + datosBase;
    titulo = "Todos de la region " + region;
  }



  const getDatos = async () => {
    try {
      const response = await fetch(URI);
      const data = await response.json();
      setDatos(data);
      setStatus(data.status)
    } catch (error) {
      console.error(error);
      setStatus(false)
    }
  };

  useEffect(() => {
    getDatos();
  }, [params.region]);

// para el autocompletado de paises
  const [nombrePais, setNombrePais] = useState('');
  const [paises, setPaises] = useState([]);
  const buscarPais = (event) => {
    setPaises(datos.filter(item => item.name.common.toLowerCase().includes(event.query.toLowerCase()))
      .map(item => item.name.common));
  };

  
 


  if(status===404){
    return(
      <div className="text-center">
        <h3 className="py-4">No se encontraron resultados para {params.name}</h3>
        <a href="#" className="btn btn-dark " onClick={() => navigate(-1)}>
          Volver
        </a>
      </div>
     
    )
  }
  return (
    <div className="container">
      {datos && Array.isArray(datos) && datos.length === 0 ? (
        <h3 className="text-center py-4">No se encontraron resultados</h3>
      ) : (
        <>

          <h3 className="text-center py-3">{titulo} ({datos.length}) Paises</h3>
          <div className="row">
         
              <div className="py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <AutoComplete 
                    value={nombrePais} 
                    style={{ width: '100%' }} 
                    suggestions={paises} 
                    completeMethod={buscarPais} 
                    onChange={(e) => setNombrePais(e.value)} 
                    dropdown 
                    placeholder="Buscar por nombre"
                    />
                    <Link to={`/detalle/${nombrePais}`} href="#" className="btn btn-danger btn-lg">Detalle</Link>
                </div>
                <hr/>
              </div>
           
 
           

          </div>
          <div className="row">
            {datos.map((item, index) => (
              <Card key={index} item={item} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Inicio;