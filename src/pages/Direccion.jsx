import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import baseUrl from '../Service/BaseUrl';
import axios from "axios";

export const Direccion = () => {

    const {idCliente} = useParams();

    const initialstate = {
        Municipio: '',
        Departamento: '',
        Complemento: '',
        idCliente: idCliente
    }

    //guardar direcciones
    const [state, setState] = useState(initialstate);
    const { Municipio, Departamento, Complemento } = state;

    //id direcciones
    const [idAddress, setAddress] = useState('');
    const url = baseUrl.url;

    //info de direcciones
    const [data, setData] = useState([]);
    
    // eliminar
    const onDeleteAddress = async(idAddress) =>{
        if(window.confirm("¿Esta Seguro Que Desea Borrar Este Registro?")){
          const resp = await axios.delete(`${url}direcciones/${idAddress}`);
          if(resp.status ===200){
            getIdDireccion();
          }
        }
    }

    //guardar
    const addAddress = async ( data ) =>{
        const resp = await axios.post(`${url}direcciones`, data);
        if(resp.status === 200){
            getIdDireccion();
        }
    }

    useEffect(() => {
        if(idCliente){
            getIdDireccion()
        }else{
            SearchAddress()
        }
    }, [idCliente])


    //obtener las direcciones
    const getIdDireccion = async() =>{
        const resp = await axios.get(`${url}direcciones/view/${idCliente}`);
        if(resp.status === 200){
            setData(resp.data);
        }
    }

    //buscar la direccion
    const SearchAddress = async ( idAddress) => {
        console.log(`id del doc. ${idAddress}`);
        setAddress(idAddress, idAddress)
        const resp = await axios.get(`${url}direcciones/${idAddress}`);
        if(resp.status === 200){
            setState({ ...resp.data})
        }
    }

    const updateAddress = async ( data, idAddress ) =>{
        const resp = await axios.put(`${url}direcciones/${idAddress}`, data);
        if(resp.status === 200){
            getIdDireccion();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Municipio || !Departamento || !Complemento){
            console.log("Campos Obligatorios Necesarios");
        }else{
            
            //id del documento seleccionado para editar
            if(idAddress){
                updateAddress(state, idAddress)
            }else{
                addAddress(state);
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

            <h2 className='text-center mt-2'>NUEVA DIRECCIÓN</h2>

            <form onSubmit={ handleSubmit }>
            
                <div className="form-group row mt-3">
                    <label htmlFor="Municipio" className="col-md-3 col-form-label text-md-right">Municipio</label>
                    <div className="col-md-8">
                        <input 
                            id="Municipio" 
                            type="text" 
                            className="form-control" 
                            name="Municipio" 
                            onChange={ handleInputChange }
                            value={ Municipio }
                        /> 
                    </div>
                </div>

                <div className="form-group row mt-3">
                    <label htmlFor="Departamento" className="col-md-3 col-form-label text-md-right">Departamento</label>
                    <div className="col-md-8">
                        <input 
                            id="Departamento" 
                            type="text" 
                            className="form-control" 
                            name="Departamento" 
                            onChange={ handleInputChange }
                            value={ Departamento }
                        /> 
                    </div>
                </div>

                <div className="form-group mt-3 row mb-5">
                    <label htmlFor="Complemento" className="col-md-3 col-form-label text-md-right">Dirección</label>
                    <div className="col-md-8">
                        <input 
                            id="Complemento" 
                            type="text" 
                            className="form-control" 
                            name="Complemento" 
                            onChange={ handleInputChange }
                            value={ Complemento }
                        /> 
                    </div>
                </div>
                <div className="row col text-center mt-3">
                    <input type="submit" value={ idAddress ? "Editar" : "Agregar" } className='btn btn-outline-primary mb-5'/>
                </div>
            </form>

        </div>

        <div className='col-6 mt-5 pt-5 card text-center'>
            <h2>MIS DIRECCIONES</h2>
           {
                data && data.map( ( item ) => {
                    return(
                        <div className='card bg-light mb-3' key={ item.id }>
                            <div className="card-header">
                                <p className="card-text">{item.Complemento}, {item.Municipio}, {item.Departamento}</p>
                            </div>
                            <div className="card-body ">
                                <div className='btn-group'>
                                    <button className='btn btn-outline-warning mx-1' onClick={() => SearchAddress(item.id)}>Editar</button>
                                </div>
                                <div className='btn-group'>
                                    <button className='btn btn-outline-danger mx-1' onClick={() => onDeleteAddress(item.id)}>Borrar</button>
                                </div>
                            </div>
                        </div>
                    )
                })
           }
        </div>
    </div>
  )
}
