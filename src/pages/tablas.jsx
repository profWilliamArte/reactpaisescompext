import { useEffect, useState } from "react";


const API = 'https://restcountries.com/v3.1/';
const datosBase = "?fields=name,flags,capital,region,subregion,population,languages";


import { Link, useParams } from "react-router-dom";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';

const Tablas = () => {
  const [datos, setDatos] = useState([]);
  let  URI = API + "all" + datosBase;
  let titulo = "Todos los paises";
  const params = useParams();
  const region = params.region;
  if(region === undefined || region === 'all'){
    URI = API + "all" + datosBase;
    titulo = "Todos los paises";
  }else{
    URI = API + "region/" + region + datosBase;
    titulo = "Todos de la region " + region;
  }
 

  const getDatos = async () =>{
    try {
      const response = await fetch(URI);
      const data = await response.json();
      //console.log(data)
      setDatos(data);
    } catch (error) {
      console.error(error)
    }
  };
  useEffect(()=>{
    getDatos();
  },[]);

    const header = (
        <div className="text-center">
            <span className="text-center h3">Lista de Paises</span>
        
        </div>
    );
    const footer = (
        <div className="text-center">
              Total {datos ? datos.length : 0} Paises
        </div>
      
    )

    function formatNumber(number) {
      return number.toLocaleString('es-ES', { useGrouping: true });
    }
  return (
    <div className="container">
      {datos && Array.isArray(datos) && datos.length === 0 ? (
        <h3 className="text-center py-4">No se encontraron resultados</h3>
      ):(
        <div className="pt-4">
             
             <div className="card" >

                <DataTable  stripedRows showGridlines   value={datos} header={header} footer={footer} paginator   rows={5} rowsPerPageOptions={[5, 10, 25, 50]} >
                    <Column field="flags.png" header="Bandera" body={(rowData) => <img src={rowData.flags.png} alt={rowData.name.common} width="50" />} />
                    <Column field="name.common" sortable  header="Nombre" />
                    <Column field="capital" sortable  header="Capital" />
                    <Column field="region" sortable  header="Region" />
                    <Column field="subregion" sortable  header="Sugregion" />
                    <Column field="languages" header="Idioma(s)"    body={(rowData) => Object.values(rowData.languages).join(', ')} />
                    <Column field="population"  header="Población" body={(rowData) => formatNumber(rowData.population)}  style={{ textAlign: 'right' }}  />
                    <Column header="Detalles"  body={(rowData) => (
                      <Link to={`/detalle/${rowData.name.common}`}>
                        <button className="btn btn-outline-primary">Detalles</button>
                      </Link>
                    )} />
                
                
                </DataTable>
            </div>
            
         
        </div>
      )}
      
    </div>
  )
}

export default Tablas