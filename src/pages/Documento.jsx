import React, { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom';
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Swal from 'sweetalert2'
import baseUrl from '../Service/BaseUrl';


export const Documento = () => {

    const {idCliente} = useParams();

    const initialstate = {
        Nombre: '',
        Valor: '',
        idCliente: idCliente
    }

    //guardar direcciones
    const [state, setState] = useState(initialstate);
    //id documento
    const [idDocumento, setidDocumento] = useState('');
    const { Nombre, Valor } = state;
    const url = baseUrl.url;

    //info de documento
    const [data, setData] = useState();

    useEffect(() => {
        //id del cliente
        if(idCliente){
             getIdDocumentos();
       
        }else{
            SearchIdDocumento()
        }
         
    }, [idCliente]) 

    //guardar
    const addDocumentos= async ( data ) =>{
        const resp = await axios.post(`${url}documentos`, data);
        if(resp.status === 200){
            getIdDocumentos();
            toast.success('Se ha guardado');
        }
    }

    //Menssage
    const Menssage = (idDocumento) =>{
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
                deleteDocumento(idDocumento)
            }

        })
    }

    // eliminar
    const deleteDocumento = async (idDocumento) => {
            await axios.delete(`${url}documentos/${idDocumento}`);
            getIdDocumentos();
            toast.success('Borrado Exitosamente!!!');
    }

    //obtener los data
    const getIdDocumentos = async() =>{
        const resp = await axios.get(`${url}documentos/view/${idCliente}`);
        if(resp.status === 200){
            setData(resp.data);
        }
    }

    //buscar el documento
    const SearchIdDocumento = async ( idDocumento ) => {
        //console.log(`id del doc. ${idDocumento}`);
        setidDocumento(idDocumento, idDocumento)
        const resp = await axios.get(`${url}documentos/${idDocumento}`);
        if(resp.status === 200){
            setState({ ...resp.data})
        }
    }

    const updateUser = async ( data, idDocumento ) =>{
        const resp = await axios.put(`${url}documentos/${idDocumento}`, data);
        if(resp.status === 200){
            getIdDocumentos();
            toast.success('Se ha Actualizado');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Nombre || !Valor){
            console.log("Campos Obligatorios Necesarios");
        }else{
            //id del documento seleccionado para editar
            if(idDocumento){
                updateUser(state, idDocumento)
            }else{
                addDocumentos(state)
            }
            //para limpiar los campos del formulario
            setState(initialstate)
        }
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;
        setState({ ...state, [name]: value });
    }

  return (
    <div className='row'>

        <div className='card col-6 mt-5'>

            <h2 className='text-center mt-2'>Documento</h2>

            <form onSubmit={ handleSubmit }>
            
                <div className="form-group row mt-3">
                    <label htmlFor="Nombre" className="col-md-2 col-form-label text-md-right">Nombre</label>
                    <div className="col-md-8">
                        <input 
                            id="Nombre" 
                            type="text" 
                            className="form-control" 
                            name="Nombre" 
                            onChange={ handleInputChange }
                            value={ Nombre }
                        /> 
                    </div>
                </div>

                <div className="form-group row mt-3 mb-5">
                    <label htmlFor="Valor" className="col-md-2 col-form-label text-md-right">Valor</label>
                    <div className="col-md-8">
                        <input 
                            id="Valor" 
                            type="text" 
                            className="form-control" 
                            name="Valor" 
                            onChange={ handleInputChange }
                            value={ Valor }
                        /> 
                    </div>
                </div>
                <div className="row col text-center mt-3">
                    <input type="submit"  value={ idDocumento ? "Editar" : "Agregar" } className='btn btn-outline-primary mb-5'/>
                </div>
            </form>

        </div>

        <div className='col-6 mt-5 pt-3 card text-center'>
            <h2>Mis Documentos</h2>
            
            {
                data && data.map( ( item ) =>{
                    return(

                        <div className='card bg-light mb-3' key={ item.id }>
                            <div className="card-header">
                                <p className="card-text">{ item.Nombre }: { item.Valor }</p>
                            </div>
                            <div className="card-body ">
                                <div className='btn-group'>
                                    <button className='btn btn-outline-warning mx-1' onClick={() => SearchIdDocumento(item.id) }>Editar</button>
                                </div>
                                <div className='btn-group'>
                                    <button className='btn btn-outline-danger mx-1' onClick={() => Menssage(item.id)}>Borrar</button>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
     
        </div>


        <Toaster
            position='bottom-left'
        />
    </div>
  )
}
