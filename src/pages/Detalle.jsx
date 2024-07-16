
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"
import Card from "../componets/Card";


const API='https://restcountries.com/v3.1/name/';
const API2='https://restcountries.com/v3.1/region/';
const datosBase = "?fields=name,flags,capital,region,subregion,population";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Detalle = () => {
    const params = useParams()
    const [datos, setDatos] = useState([])
    const [datos2, setDatos2] = useState([])
    const [continente, setContinente] = useState('')
 
    const [status, setStatus] = useState(false)
    let URI=API+params.name
    let URI2="";

    const getDatos = async () =>{
        try {
          const response = await fetch(URI);
          const data = await response.json();
          //console.log(data)
          setDatos(data);
          setStatus(data.status)
          // mas paises
          URI2 = API2 +  data[0].region + datosBase;
          setContinente(data[0].region);
          const response2 = await fetch(URI2);
          const data2 = await response2.json();
          setDatos2(data2);
    
        



        } catch (error) {
          console.error(error)
          setStatus(false)
        }
      };
      useEffect(()=>{
        getDatos();
      },[params.name]);



      function formatToMillions(num) {
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(2)} millones`;
        } else {
          return num.toLocaleString();
        }
      }
      const navigate = useNavigate();

      const settings = {
        dots: true,
        infinite: true,
        speed:500,
        slidesToShow: 6,
        slidesToScroll: 6
      };

if(status===404 || status===false || Array.isArray(datos)===false){
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
        <h3 className="text-center py-4">Detalle del Pais </h3>
        {datos && Array.isArray(datos) && datos.map((item, index)=>(
            <div className="row" key={index}>
                <div className="col-md-4  text-center">
                <p className="text-center">Bandera</p>
                    <img src={item.flags.png} alt="" className="img-fluid img-thumbnail " />
                    <p className="text-center py-4">Escudo de armas</p>
                    <img src={item.coatOfArms.png} alt="" className="img-fluid"  />
                </div>
                <div className="col-md-8">
                    <h3>{item.name.common}</h3>
                    <p>
              
                        <b>Nombre Oficial:</b> {item.name.official}<br/>
                        <b>Continente:</b> {item.region}<br/>  
                        <b>Capital:</b> {item.capital} <br />
                        <b>Latitud y Longitud:</b> {item.capitalInfo?.latlng?.join(', ') || 'N/A'}<br/>

                        <b>Sub Region:</b> {item.subregion}<br/> 
                        <b>Población:</b> {formatToMillions(item.population)}<br/> 
                        <b>Tamaño Geográfico:</b> {item.area} km²<br/>
                        <b>Moneda Oficial:</b> {item.currencies && Object.values(item.currencies)[0].name} /  {item.currencies && Object.values(item.currencies)[0].symbol}<br/>
                        <b>languages:</b> {item.languages && Object.values(item.languages).join(' / ')}<br/> 
                        <b>Gentilicio:</b> {item.demonyms && Object.values(item.demonyms)[0].f}<br/>
                        <b>Latitud y Longitud:</b> {item.latlng && item.latlng.join(' / ')}<br/>
                        <b>Países vecinos:</b> {item.borders && item.borders.join(' / ')}<br/>
                    </p>
                        
                    <hr/>
                    
                    <p>
                        <b>Códigos</b><br/> 
                        <b>Alfa-2 de la norma ISO 3166-1:</b> {item.cca2}<br/> 
                        <b>Alfa-3 de la norma ISO 3166-1:</b> {item.ccn3}<br/> 
                        <b>Numérico ISO 3166-1:</b> {item.cca3}<br/> 
                        <b>Olímpico Internacional (COI):</b> {item.cioc}<br/> 
                        <b>Fifa</b> {item.fifa}<br/> 
                        <b>Root:</b> {item.idd.root} / {item.idd.suffixes && item.idd.suffixes.length > 0 && Object.values(item.idd.suffixes).join(' / ')} <br/> 
                    </p>
                   
                    <p>
                        <b>Información Vehicular: </b> {item.car.signs.join(', ')} / {item.car.side}<br/><br/>
                       
                      

                   
                        <b>Zonas Horarias</b>  {item.timezones && Object.values(item.timezones).join(' / ')}   <br/><br/>

                    </p>
             
                        <a href={item.maps.googleMaps} className="btn btn-outline-info btn-sm me-3" target="_blank">Mostrar en Google Maps </a>
                        <a href={item.maps.openStreetMaps} className="btn btn-outline-warning btn-sm" target="_blank">Mostrar en OpenStreetMaps </a>
                    <hr/>
                    
                    <a href="#" className="btn btn-dark btn-sm" onClick={() => navigate(-1)}>
                        Volver
                    </a>
                </div>
               
            </div>
            
      
        ))}

        <hr/>
        <h4 className="text-center py-4">Mas paises del continente {continente} ({datos2.length})</h4>
        <div className="row">
        <Slider {...settings}>
            {datos2.map((item, index) => (
               <div key={item.id} >
               <div className="card h-100" data-bs-theme="dark">
                   <div className="card-header p-0">
                       <img src={item.flags.png} alt="" className="img-fluid card-img-top" />
                   </div>
                   <div className="card-body text-center  " style={{height: '100px'}}>
                       <p className="fw-bold">{item.name.common}</p>
                   </div>
                   <div className="card-footer text-center">
                      
                       <Link to={`/detalle/${item.name.common}`} href="#" className="btn btn-outline-danger btn-sm">Detalle</Link>
                   </div>
               </div>
                  
           </div>
            ))}
          </Slider>
          </div>

     </div>
  )
}

export default Detalle