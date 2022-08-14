import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "../estilos/receta.module.css"

export const Recetas = ({ name, image, tipoDieta, id, NivelHealth }) => {


  return (
    <div className={style.receta}>

      <div>
        <h3>{name}</h3>
        <div className={style.heatlh}>
          <h4>{NivelHealth}</h4>
          <img src='/corazon.png'></img>
        </div>
        <img src={image}></img>
        <div className={style.button}>

          <NavLink className={style.botonDetalles} state={id} to={"/recetaDetalle"}>Detalles</NavLink>
        </div>

        {tipoDieta.map((elemento, index) => {
          return (
            <p key={index}>{elemento.Nombre}</p>

          )
        })}
      </div>
    </div>
  )
}
