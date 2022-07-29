import { Cliente } from "./pages/Cliente";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Direccion } from "./pages/Direccion";
import { AddEdit } from "./pages/AddEdit";
import { Documento } from "./pages/Documento";


export const CrudApp = () => {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element= {< Cliente/>} />
          <Route path="/direccion/:idCliente" element= {< Direccion/>} />
          <Route path="/documento/:idCliente" element= {< Documento/>} />
          <Route path="/agregar" element= {< AddEdit/>} />
          <Route path="/editar/:id" element= {< AddEdit/>} />

        </Routes>
      
    </BrowserRouter>
    </>

  )
}
