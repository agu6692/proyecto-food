import React from 'react'
import {searchByName} from "../actions/index"
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const SearchBar = () => {
    const dispatch= useDispatch()

    const[name,setName]= useState("")
    function handleName(e){
        setName(e.target.value)
        dispatch(searchByName(e.target.value))
    }
  return (
    <div>
        <label>Busca tu receta favorita!</label>
        <input type="text" placeholder='Ingresa receta' onChange={e => handleName(e)}></input>
    </div>
  )
}
