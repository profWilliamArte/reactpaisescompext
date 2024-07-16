import { Link } from "react-router-dom";
import Modal from "./Modal";


const Card = ({item, index}) => {


    return (
        <div key={item.id} className="col-md-4 col-lg-3  mb-4">
            <div className="card h-100" data-bs-theme="dark">
                <div className="card-header p-0">
                    <img src={item.flags.png} alt="" className="img-fluid card-img-top" />
                </div>
                <div className="card-body text-center d-felx justify-content-center align-items-center">
                    <h5 className="fw-bold">{item.name.common}</h5>
                </div>
                <div className="card-footer text-center">
                    <a href="#" className="btn btn-outline-success btn-sm me-2" data-bs-toggle="modal" data-bs-target={`#${index}`}>Modal</a>
                    <Link to={`/detalle/${item.name.common}`} href="#" className="btn btn-outline-danger btn-sm">Detalle</Link>
                </div>
            </div>
                <Modal key={index} item={item} index={index}/>
        </div>
    )
}

export default Card