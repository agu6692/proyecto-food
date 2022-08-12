import React from 'react'

export const Paginacion = ({recetasPagina,recipes,paginado}) => {
    const nuemeroDePaginas= []
    for(let i =1;i <= Math.ceil(recipes/recetasPagina);i++){
        nuemeroDePaginas.push(i)
    }
    console.log(nuemeroDePaginas)
  return (
    <div>
            
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
