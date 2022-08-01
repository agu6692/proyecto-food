const { Router } = require('express');
const axios= require("axios");
const Recipe = require('../models/Recipe');
const TipoDieta = require('../models/TipoDieta');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    API_KEY
  } = process.env;

const router = Router();

const apiInfo= async()=>{
       const response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
      const info= await response.data.results
      
      
        return info;
}

const dbInfo= async()=>{
    return await Recipe.findAll({
      include:{
        model: TipoDieta,
        atribbutes: [Nombre],
        through:{
          atribbutes: [],
        }
      }
    })
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes",async(req,res)=>{
        
   let info= await apiInfo()

   
    
  
  
  
   
   res.status(200).send(info)
})


/*
GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado
 
GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados
 
POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.
 
GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá

*/ 


module.exports = router;
