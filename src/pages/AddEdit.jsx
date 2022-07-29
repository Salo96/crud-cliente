import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../Service/BaseUrl';

const initialstate = {
    Nombres: '',
    Apellidos: '',
    Correo: '',
    Contacto: '',
}

export const AddEdit = () => {

    const [state, setState] = useState(initialstate);
    const { Nombres, Apellidos, Contacto, Correo } = state

    const url = baseUrl.url;
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if(id){
            getIdCliente(id)
        }
    }, [id])

    const getIdCliente = async ( id ) => {
        const resp = await axios.get(`${url}clientes/${id}`);
        if(resp.status === 200){
            setState({ ...resp.data})
        }
    }

    const addCliente = async ( data ) =>{
        const resp = await axios.post(`${url}clientes`, data);
        if(resp.status === 200){
           
            console.log("se ha guardado");
        }
        navigate("/");
    }
    
    const updateUser = async ( data, id ) =>{
        const resp = await axios.put(`${url}clientes/${id}`, data);
        if(resp.status === 200){
          console.log("se ha actualizado");
        }
        navigate("/");
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!Nombres || !Apellidos || !Contacto || !Correo){
            console.log("no se ha guardado");
        }else{
            if(!id){
                addCliente(state);
            }else{
                updateUser(state, id)
            }
        }
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;

        setState({ ...state, [name]: value });
    }

  return (
    <div className='row'>
        <h1 className='text-center'>{ id ? "Editar Cliente" : "Agregar Cliente" }</h1>

        <form onSubmit={ handleSubmit }>

            <div className="form-group row mt-2">
                
                <div className="col-md-6">
                <label htmlFor="Nombres" className="col-md-1 col-form-label text-md-right">Nombres</label>
                    <input 
                        id="Nombres" 
                        type="text" 
                        className="form-control" 
                        name="Nombres" 
                        onChange={ handleInputChange }
                        value={ Nombres }
                    /> 
                </div>
                
                <div className="col-md-6">
                <label htmlFor="Apellidos" className="col-md-1 col-form-label text-md-right">Apellidos</label>
                    <input 
                        id="Apellidos" 
                        type="text" 
                        className="form-control" 
                        name="Apellidos" 
                        onChange={ handleInputChange }
                        value={ Apellidos }
                    /> 
                </div>
            </div>

            <div className="form-group row mt-2">
                <div className="col-md-6">
                <label htmlFor="Contacto" className="col-md-1 col-form-label text-md-right">Contacto</label>
                    <input 
                        id="Contacto" 
                        type="text" 
                        className="form-control" 
                        name="Contacto"
                        onChange={ handleInputChange }
                        value={ Contacto }
                    /> 
                </div>
                
                <div className="col-md-6">
                <label htmlFor="Correo" className="col-md-1 col-form-label text-md-right">Correo</label>
                    <input 
                        id="Correo" 
                        type="email" 
                        className="form-control" 
                        name="Correo" 
                        onChange={ handleInputChange }
                        value={ Correo }
                    /> 
                </div>
            </div>

            <div className="row text-center mt-5">
                <input type="submit" value={ id ? "Editar" : "Agregar" } className='btn btn-lg btn-block btn-outline-primary' />
            </div>

        </form>

    </div>
  )
}
