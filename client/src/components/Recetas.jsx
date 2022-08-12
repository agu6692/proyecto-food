import React from 'react'
import { NavLink } from 'react-router-dom'

export const Recetas = ({name,image,tipoDieta,id}) => {
     

  return (
    <div>
      <h2>{name}</h2>
      

      <img src={image}></img>

      {tipoDieta.map((elemento,index)=>{
        return(
          <p key={index}>{elemento.Nombre}</p>
        )
      })}

     <NavLink  state={id}  to={"/recetaDetalle"}>Detalles</NavLink>
      
      </div>
  )
}
