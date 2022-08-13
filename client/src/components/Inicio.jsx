import React from 'react'
import { Recetas } from './Recetas'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {getRecipes,filterRecipesByDiet,orderByName,orderBySaludable} from "../actions/index"
import { Paginacion } from './Paginacion'
import { SearchBar } from './SearchBar'
import { NavLink } from 'react-router-dom'
import style from "../estilos/Inicio.module.css"

export const Inicio = () => {
    const dispatch= useDispatch()
    const recipes= useSelector((state)=> state.recetas)

    const[paginaActual, setPaginaActual]= useState(1)
    const[recetasPagina]= useState(9)

    const[orden,setOrden]= useState("")
    const[saludable,setSaludable]= useState("")
    const[loading,setLoading]=useState("Cargando recetas...")
    
    
    
    useEffect(()=>{
      
      if(recipes.length < 1){
        dispatch(getRecipes())
        
      }
      else if(recipes.length > 1){
        setLoading("")
      }
      
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
    function handleSaludable(e){
      dispatch(orderBySaludable(e.target.value))
      setSaludable(e.target.value)
    }
  return (
    <div>
       <div className={style.nuevaReceta}>
       <NavLink  to={"/crearReceta"}>Cargar nueva receta!</NavLink>
       </div>
       
       <div className={style.filtros}>
          <label>Az-Za</label>
          <select onChange={e => handleOrder(e)}>
              <option value="asc">ascendente</option>
              <option value="desc">descendente</option>
          </select>
          <label>Nivel de saludable</label>
          <select onChange={e => handleSaludable(e)}>
              <option value="noSaludable">Menos Saludable</option>
              <option value="saludable">Mas Saludable</option>
          </select>
          <label>Tipo de dieta</label>
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
          <button onClick={e=>{handleClick(e)}} className={style.button}>Limpiar filtros</button>
       </div>
       <div className={style.SearchBar}>

          <SearchBar ></SearchBar>

       </div>
          <Paginacion recetasPagina={recetasPagina} recipes={recipes.length} paginado={paginado}></Paginacion>
       <div className={style.contenedor}>
          
          <div className={style.cartas}>
          {
           recetasActuales && recetasActuales.map(elemento =>{
               if(elemento.createDB===true){
                elemento.image="/receta.png"
               }
            return (

                <Recetas 
                key={elemento.id} 
                id={elemento.id}
                name={elemento.Nombre} 
                image={elemento.image}
                NivelHealth={elemento.NivelHealth}
                tipoDieta={elemento.TipoDieta}
                

              
                
                ></Recetas>
            )
           })
          }
          </div>
          
       </div>
       <p>{loading}</p>
       
    </div>
  )
}
