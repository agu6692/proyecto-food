import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "../estilos/receta.module.css"

export const Recetas = ({name,image,tipoDieta,id,NivelHealth}) => {
     

  return (
    <div className={style.receta}>
      <h3>{name}</h3>
      <h4>{NivelHealth}</h4>

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
