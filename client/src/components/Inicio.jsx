import React from 'react'
import { Recetas } from './Recetas'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getRecipes,filterRecipesByDiet,orderByName} from "../actions/index"
import { Paginacion } from './Paginacion'
import { SearchBar } from './SearchBar'
import { NavLink } from 'react-router-dom'

export const Inicio = () => {
    const dispatch= useDispatch()
    const recipes= useSelector((state)=> state.recetas)

    const[paginaActual, setPaginaActual]= useState(1)
    const[recetasPagina,setRecetasPagina]= useState(9)

    const[orden,setOrden]= useState("")

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
    function handleOrder(e){
      dispatch(orderByName(e.target.value))
      setOrden(e.target.value)
    }
  return (
    <div>
      <NavLink  to={"/crearReceta"}>Cargar nueva receta!</NavLink>
       <button onClick={e=>{handleClick(e)}}>cargar recetas</button>
       
       <div>
          <select onChange={e => handleOrder(e)}>
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
          <SearchBar></SearchBar>
          
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
