import React,{useEffect} from 'react'

import { useDispatch } from 'react-redux'
import { getRecipes } from "../actions/index"

import style from "../estilos/landing.module.css"

import { NavLink } from 'react-router-dom'



export const Entrada = () => {
  const dispatch= useDispatch()
  
  useEffect(()=>{
    dispatch(getRecipes())
},[])
  return (
    <div className={style.landing}>
          <NavLink className={style.boton} to={"/inicio"}>Ingresar</NavLink>
          
       
     
    </div>
  )
}
