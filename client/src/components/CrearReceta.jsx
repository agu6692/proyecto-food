import React, { useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'

import {getDietas,postReceta} from "../actions"
import { useDispatch,useSelector } from 'react-redux'



function validate(input){
    let errores={}
    if(input.NivelHealth>100 || input.NivelHealth<1){
        errores.NivelHealth="ingresa un numero entre 1 y 100"
    }
    if(input.Resumen === null || input.Resumen === ""){
        errores.Resumen="ingresa un resumen de tu receta"
    }
    if(input.Nombre === null || input.Nombre === ""){
       errores.Nombre="ingresa un nombre"
       
    }
    if(input.pasos === null || input.pasos === ""){
        errores.pasos="ingresa el paso a paso de la receta"
    }
   return errores
}


export const CrearReceta = () => {
    useEffect(()=>{
        dispatch(getDietas())
    },[])

    

    const navigate = useNavigate();
    const dispatch= useDispatch()
    const dietas= useSelector((state) => state.dietas)
    const [input, setInput]= useState({
        Nombre:"",
        Resumen:"",
        NivelHealth:"",
        pasos:"",
        dieta:[]

    })

    const [errores, setErrores]= useState({})

    const [mensajeBoton, setMensaje]= useState("")

    const [disable, setDisable]= useState(true)

    

    


    useEffect(()=>{
        dispatch(getDietas())
       
        
    },[])

    

    function handleChange(e){
         
         setInput({
            ...input,
            [e.target.name]: e.target.value
         })

         setErrores(validate({
            ...input,
            [e.target.name]:e.target.value
         }))
         
         

         if(input.Nombre && input.Resumen){
            setDisable(false)
         }else{
            setDisable(true)
         }

         
  

        
         
         
         
         
    }

    function handleSelect(e){
        setInput({
            ...input,
            dieta:[...input.dieta,e.target.value]
        })
        
    }

    function handleSubmit(e){
        e.preventDefault()
        
            dispatch(postReceta(input))
            setMensaje("receta cargada con exito")
            setInput({
                Nombre:"",
                Resumen:"",
                NivelHealth:"",
                pasos:"",
                dieta:[]
            })
           setTimeout(function(){

               navigate("/inicio");
           },3000
           )
           
       
       

       
    }


    function handleDelete(elemento){
        setInput({
            ...input,
            dieta: input.dieta.filter(diet => diet !== elemento)
    })
    }



    
  return (
      <div>
        <NavLink  to={"/inicio"}>Volver</NavLink>
        
        <h3>Crear--Receta</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre</label>
                <input onChange={e => handleChange(e)} type="text" value={input.Nombre}  name="Nombre"></input>
                <p>{errores.Nombre}</p>
            </div>
            <div>
                <label>Resumen</label>
                <input onChange={e => handleChange(e)} type="text" value={input.Resumen}  name="Resumen"></input>
                <p>{errores.Resumen}</p>
            </div>
            <div>
                <label>Saludable</label>
                <input onChange={e => handleChange(e)} type="number"  value={input.NivelHealth}  name="NivelHealth"></input>
                <p>{errores.NivelHealth}</p>
            </div>
            <div>
                <label>Pasos</label>
                
                <textarea name="pasos" rows="10" cols="50" onChange={e => handleChange(e)} value={input.pasos}>Write something here</textarea>
                <p>{errores.pasos}</p>
            </div>
            <div>
                <label>Dietas</label>
                <select onChange={(e)=>handleSelect(e)}>
                 {dietas.map((diet)=>(
                    <option key={diet.id}  >{diet.Nombre}</option>
                 ))} 

                 </select> 
                 <ul>
                   {input.dieta.map((elemento,index) => {
                      return (
                        <div key={index}>
                        <li >{elemento}</li>
                        <button onClick={()=>handleDelete(elemento)}>X</button>
                        </div>
                      )
                   })}    
                    
                </ul> 
                

            </div>

            <button type='submit' disabled={disable}>Cargar receta</button>
            <p>{mensajeBoton}</p>
           

        </form>

        
    </div>
  )
}
