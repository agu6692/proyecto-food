import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "../estilos/noEncontrado.module.css"

export const NoEncontrado = () => {
  return (
    <div className={style.volver}>
        <NavLink className={style.boton}  to={"/inicio"}>Volver</NavLink>
    </div>
  )
}
