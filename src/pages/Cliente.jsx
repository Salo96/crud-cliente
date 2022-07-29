import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2'
import {  Toaster } from "react-hot-toast";
import axios from "axios";
import baseUrl from '../Service/BaseUrl';

export const Cliente = () => {

    const [data, setData] = useState([]);
    const url = baseUrl.url;

    useEffect(() => {
        getCliente();
    },[]);

    const getCliente = async() =>{
        const resp = await axios.get(`${url}clientes`);
        if(resp.status === 200){
            setData(resp.data);
        }
    }

    //Menssage
    const Menssage = (id) =>{
        Swal.fire({
            title: "¿estas seguro?",
            text: "Una ves eliminado ya no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'eliminar'
        }).then((result) => {

            if (result.isConfirmed) {
                deleteClient(id)
            }

        })
    }

    // eliminar
    const deleteClient = async (id) => {
        await axios.delete(`${url}clientes/${id}`);
        getCliente();
        toast.success('Borrado Exitosamente!!!');
    }

  return (
    <div className="row">

        <Link to={'/agregar'}>
            <button className="btn btn-outline-success col-3 mt-3 mb-3">Agregar Cliente</button>
        </Link>

       <table className="table">
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Correo</th>
              <th scope="col">Contacto</th>
              <th scope="col">Opciones</th>
            </tr>
        </thead>

        <tbody>
            {
                data && data.map(( item, i ) => {
                    return(
                    <tr key={ item.id }>
                        <th scope="row">{ i + 1 }</th>
                        <td>{ item.Nombres }</td>
                        <td>{ item.Apellidos }</td>
                        <td>{ item.Correo }</td>
                        <td>{ item.Contacto }</td>
                        <td>
                            <Link to={`/direccion/${ item.id }`}>
                                <button className="btn btn-outline-primary mx-1">Dirección</button>
                            </Link>
                            <Link to={`/documento/${ item.id }`}>
                                <button className="btn btn-outline-dark mx-1">Documento</button>
                            </Link>
                            <Link to={`/editar/${ item.id }`}>
                                <button className="btn btn-outline-warning mx-1">Editar</button>
                            </Link>
                            
                            <button className="btn btn-outline-danger mx-1" onClick={() => Menssage(item.id)} >Eliminar</button>
                        </td>
                    </tr>
                )})
            }
        </tbody>

       </table>

       <Toaster
            position='bottom-left'
        />
    
    </div>
  )
}
