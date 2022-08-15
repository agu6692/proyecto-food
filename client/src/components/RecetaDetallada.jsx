import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getRecipesID } from "../actions/index"
import style from "../estilos/detalle.module.css"

export const RecetaDetallada = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.state
  


  useEffect(() => {
    dispatch(getRecipesID(id))
  }, [dispatch])
  const receta = useSelector((store) => store.detalle)
  let src = ""
  if (receta.length > 0) {


    if (receta[0].createDB === false) {
      src = receta[0].image
    } else {
      src = "/receta.png"
    }
  }
  function handleVolver(){
    receta=[]
  }
  return (
    <div className={style.receta}>
      <div className={style.volver}>
        <NavLink className={style.boton}  to={"/inicio"} onClick={handleVolver}>Volver</NavLink>
      </div>
      {
        receta.length > 0 ?
          <div className={style.contenedor}>
            <div>
              <h3>{receta[0].Nombre}</h3>
              <img src={src}></img>
              <div className={style.health}>
                <img src='/corazon.png'></img>
                <p>{receta[0].NivelHealth}</p>
              </div>
            </div>
            <div>
              {
                receta[0].TipoDieta.map((elemento,index) => {
                  return <p key={index}>{elemento.Nombre}</p>
                })

              }
            </div>
            <div className={style.texto}>
              <h4>Resumen</h4>
              <div>
                <p>{receta[0].Resumen}</p>
              </div>
              <h4>Paso a Paso</h4>
              <div>
                <p>{receta[0].pasos}</p>
              </div>
            </div>

          </div>
          :
          <p>Loading</p>


      }
    </div>
  )
}
