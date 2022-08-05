import React from 'react'
import styled from 'styled-components'

import style from "../estilos/landing.module.css"

import { NavLink } from 'react-router-dom'

const Landing = styled.div`
    
`

export const Entrada = () => {
  return (
    <div className={style.landing}>
          <NavLink className={style.boton} to={"/inicio"}>Ingresar</NavLink>
          
       
     
    </div>
  )
}
