import React from 'react'
import style from "../estilos/paginacion.module.css"

export const Paginacion = ({recetasPagina,recipes,paginado}) => {
    const nuemeroDePaginas= []
    for(let i =1;i <= Math.ceil(recipes/recetasPagina);i++){
        nuemeroDePaginas.push(i)
    }
    
  return (
    <div className={style.paginado}>
            
        <ul>
            {nuemeroDePaginas.map(numero =>{
                return (
                <li key={numero}>
                 <a onClick={()=>paginado(numero)}>{numero}</a>
                </li>
                )
            })}
        </ul>
    </div>
  )
}
