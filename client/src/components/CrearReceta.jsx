import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { getDietas, postReceta ,getRecipes} from "../actions"
import { useDispatch, useSelector } from 'react-redux'
import style from "../estilos/crear.module.css"



function validate(input) {
    let errores = {}
    if (input.NivelHealth > 100 || input.NivelHealth < 1) {
        errores.NivelHealth = "ingresa un numero entre 1 y 100"
    }
    if (input.Resumen === null || input.Resumen === "") {
        errores.Resumen = "ingresa un resumen de tu receta"
    }
    
    if (input.Nombre === null) {
        errores.Nombre = "Ingrese el nombre"

    }else if(!/^[A-Za-z\s]+$/.test(input.Nombre)){
        errores.Nombre = "Ingrese un nombre valido, sin caracteres especiales ni numeros"
    }



    if (input.pasos === null || input.pasos === "") {
        errores.pasos = "ingresa el paso a paso de la receta"
    }
    return errores
}


export const CrearReceta = () => {
    useEffect(() => {
        dispatch(getDietas())
    }, [])



    const navigate = useNavigate();
    const dispatch = useDispatch()
    const dietas = useSelector((state) => state.dietas)
    const [input, setInput] = useState({
        Nombre: "",
        Resumen: "",
        NivelHealth: "",
        pasos: "",
        dieta: []

    })

    const [errores, setErrores] = useState({})

    const [mensajeBoton, setMensaje] = useState("")
    const [estiloBoton, setEstilo] = useState("")

    const [disable, setDisable] = useState(true)






    useEffect(() => {
        
        dispatch(getDietas())
        
    }, [])



    function handleChange(e) {
        
       
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrores(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        if (input.Nombre && input.Resumen && /^[A-Za-z\s]+$/.test(input.Nombre) && input.Resumen.length > 0  && input.Nombre.length > 0)  {
            setDisable(false)
        
        } else {
            setDisable(true)
        }












    }

    function handleSelect(e) {
        setInput({
            ...input,
            dieta: [...input.dieta, e.target.value]
        })

    }

    function handleSubmit(e) {
        e.preventDefault()
        if(input.NivelHealth>0 && input.NivelHealth < 101 && input.Nombre && input.Resumen && input.Nombre.length < 200){
            dispatch(postReceta(input))
            dispatch(getRecipes())
            setEstilo("exito")
            setMensaje("Receta cargada con exito")
            setInput({
                Nombre: "",
                Resumen: "",
                NivelHealth: "",
                pasos: "",
                dieta: []
            })
            setTimeout(function () {
    
                navigate("/inicio");
            }, 3000
            )

        }else{
            setEstilo("error")
            setMensaje("Error en los datos del formulario")
            setInput({
                Nombre: "",
                Resumen: "",
                NivelHealth: "",
                pasos: "",
                dieta: []
            })
        }





    }


    function handleDelete(elemento) {
        setInput({
            ...input,
            dieta: input.dieta.filter(diet => diet !== elemento)
        })
    }




    return (
        <div>
            <div className={style.volver}>
            <NavLink className={style.boton} to={"/inicio"}>Volver</NavLink>
            </div>
            <div className={style.contenedor}>

            
            <form className={style.formulario} onSubmit={handleSubmit}>
                <div>
                    <h4>Nombre</h4>
                    <input onChange={e => handleChange(e)} type="text" value={input.Nombre} name="Nombre" placeholder='Maximo 200 caracteres, no introducir simbolos'></input>
                    <p>{errores.Nombre}</p>
                </div>
                <div>
                    <h4>Resumen</h4>
                    <input onChange={e => handleChange(e)} type="text" value={input.Resumen} name="Resumen"></input>
                    <p>{errores.Resumen}</p>
                </div>
                <div>
                    <h4>Saludable</h4>
                    <input onChange={e => handleChange(e)} type="number" max="100" min="1" value={input.NivelHealth} name="NivelHealth"></input>
                    <p>{errores.NivelHealth}</p>
                </div>
                <div>
                    <h4>Pasos</h4>

                    <textarea name="pasos" rows="10" cols="50" onChange={e => handleChange(e)} value={input.pasos}>Write something here</textarea>
                    <p>{errores.pasos}</p>
                </div>
                <div className={style.dietas}>
                    <h4>Dietas</h4>
                    <select onChange={(e) => handleSelect(e)}>
                        {dietas.map((diet) => (
                            <option key={diet.id}  >{diet.Nombre}</option>
                        ))}

                    </select>
                    
                        {input.dieta.map((elemento, index) => {
                            return (
                                <div  key={index}>
                                    
                                    <button className={style.boton} onClick={() => handleDelete(elemento)}>{elemento}</button>
                                </div>
                            )
                        })}

                   


                </div>

                <button type='submit' className={style.boton} disabled={disable}>Cargar receta</button>
                
                <h3 className={style[estiloBoton]}>{mensajeBoton}</h3>


            </form>
           </div>

        </div>
    )
}
