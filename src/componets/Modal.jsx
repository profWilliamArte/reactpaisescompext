

const Modal = ({item, index}) => {
    function formatToMillions(num) {
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(2)} millones`;
        } else {
          return num.toLocaleString();
        }
      }
  return (
    <div className="modal fade" id={index} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="dark">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Detalle del Pais</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-4">
                 <img src={item.flags.png} alt="" className="img-fluid img-thumbnail" />
            </div>
            <div className="col-md-8">
                <h3>{item.name.common}</h3>
                <p><b>Capital:</b> {item.capital}<br/>
                <b>Region:</b> {item.region}<br/>  
                <b>SubRegion:</b> {item.subregion}<br/> 
                <b>Población:</b> {formatToMillions(item.population)}
                
                </p>      
                
            </div> 
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Modal