import React from 'react'
import { Recetas } from './Recetas'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getRecipes,filterRecipesByDiet} from "../actions/index"
import { Paginacion } from './Paginacion'

export const Inicio = () => {
    const dispatch= useDispatch()
    const recipes= useSelector((state)=> state.recetas)

    const[paginaActual, setPaginaActual]= useState(1)
    const[recetasPagina,setRecetasPagina]= useState(9)

    useEffect(()=>{
        dispatch(getRecipes())
    },[])

    function handleClick(e){
      e.preventDefault();
      dispatch(getRecipes())
    }

    const ultimaReceta = paginaActual * recetasPagina 
    const primerReceta = ultimaReceta - recetasPagina 

    const recetasActuales= recipes.slice(primerReceta,ultimaReceta)

    const paginado= (numeroPagina)=>{
      setPaginaActual(numeroPagina)
    }

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiet(e.target.value))
    }
  return (
    <div>
       <button onClick={e=>{handleClick(e)}}>cargar recetas</button>
       
       <div>
          <select>
              <option value="asc">ascendente</option>
              <option value="desc">descendente</option>
          </select>
          <select onChange={e => handleFilterDiets(e)}>
              <option value="todas">todas</option>
              <option value="gluten free">gluten free</option>
              <option value="dairy free">dairy free</option>
              <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
              <option value="vegan">vegan</option>
              <option value="paleolithic">paleolithic</option>
              <option value="primal">primal</option>
              <option value="whole 30">whole 30</option>
              <option value="pescatarian">pescatarian</option>
              <option value="ketogenic">ketogenic</option>
              <option value="fodmap friendly">fodmap friendly</option>
              <option value="vegetarian">vegetarian</option>
              
          </select>
          <select>
              <option value="todos">todos</option>
              <option value="existentes">existentes</option>
              <option value="creados">creados</option>
          </select>
          <Paginacion recetasPagina={recetasPagina} recipes={recipes.length} paginado={paginado}></Paginacion>
          {
           recetasActuales && recetasActuales.map(elemento =>{
            return (

                <Recetas key={elemento.id} name={elemento.Nombre}></Recetas>
            )
           })
          }
          
       </div>
       
    </div>
  )
}
