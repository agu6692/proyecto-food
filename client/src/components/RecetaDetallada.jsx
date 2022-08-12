import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {getRecipesID} from "../actions/index"

export const RecetaDetallada = () => {
  
  const dispatch= useDispatch()
  const location= useLocation()
  const id =location.state 
  
  
  useEffect(()=>{
    dispatch(getRecipesID(id))
  },[dispatch])
  const receta= useSelector((store) => store.detalle)
  let src=""
  if(receta.length>0){

    
    if(receta[0].createDB===false){
      src=receta[0].image
    }else{
      src="/receta.png"
    }
  }
  return (
    <div>
      <NavLink  to={"/inicio"}>Volver</NavLink>
      <h2>Receta detallada</h2>
      {
         receta.length > 0 ?
         <div>
            <p>{receta[0].Nombre}</p>
            <img src={src}></img>
         </div>
         :
         <p>Loading</p>
        
        
      }
    </div>
  )
}
