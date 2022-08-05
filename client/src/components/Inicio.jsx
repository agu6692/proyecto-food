import React from 'react'
import { Recetas } from './Recetas'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getRecipes} from "../actions/index"

export const Inicio = () => {
    const dispatch= useDispatch()
    const recipes= useSelector((state)=> state.recetas)

    useEffect(()=>{
        dispatch(getRecipes())
    },[])

    function handleClick(e){
      e.preventDefault();
      dispatch(getRecipes())
    }
  return (
    <div>
       <button onClick={e=>{handleClick(e)}}>cargar recetas</button>
       <div>
          <select>
              <option value="asc">ascendente</option>
              <option value="desc">descendente</option>
          </select>
          <select>
              <option value="vegan">vegan</option>
              <option value="vege">vegetariano</option>
              <option value="palio">palio</option>
          </select>
          <select>
              <option value="todos">todos</option>
              <option value="existentes">existentes</option>
              <option value="creados">creados</option>
          </select>
          {
           recipes && recipes.map(elemento =>{
            return (

                <Recetas key={elemento.id} name={elemento.Nombre}></Recetas>
            )
           })
          }
          
       </div>
    </div>
  )
}
