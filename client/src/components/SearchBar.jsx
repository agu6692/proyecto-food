import React from 'react'
import {searchByName} from "../actions/index"
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import style from "../estilos/search.module.css"

export const SearchBar = () => {
    const dispatch= useDispatch()

    const[name,setName]= useState("")
    function handleName(e){
        setName(e.target.value)
        dispatch(searchByName(e.target.value))
    }
  return (
    <div className={style.contenedor}>
    <div className={style.search}>
        <img src='/buscar.png'></img>
        <input type="text" placeholder='Ingresa receta a buscar' onChange={e => handleName(e)}></input>
    </div>

    </div>
  )
}
