import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./componets/Header"
import Footer from "./componets/Footer"
import Inicio from "./pages/Inicio"
import Detalle from "./pages/Detalle"
import Idiomas from "./pages/Idiomas"
import Tablas from "./pages/tablas"





const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <main>
        <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/inicio/:region" element={<Inicio/>} />
            <Route path="/idiomas/:idioma" element={<Idiomas/>} />
            <Route path="/tablas" element={<Tablas/>} />
            <Route path="/detalle/:name" element={<Detalle/>} />
            <Route path="*" element={<Inicio/>} />
        </Routes>
        </main>
        <Footer/>
    </BrowserRouter>
  )
}

export default App