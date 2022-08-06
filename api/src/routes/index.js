const { Router } = require('express');
const axios= require("axios");

const { Op, Recipe, TipoDieta } = require('../db.js');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    API_KEY
  } = process.env;

const router = Router();

const apiInfo= async()=>{
  //?number=100
       const response = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
      const info= await response.data.results.map(e =>{
         return {
              id: e.id,
              Nombre: e.title,
              NivelHealth: e.healthScore,
              Resumen: e.summary.replace(/<[^>]*>/g,""),
              pasos: e.analyzedInstructions[0] &&
              e.analyzedInstructions[0].steps &&
              e.analyzedInstructions[0].steps.map((step)=> step.step),
              dieta: e.diets,
              TipoDieta: e.diets.map(elemento => {
                return (
                  {Nombre: elemento}
                )
            }),
              image: e.image,
              createDB: false

              

         }

      })
      
      
        return info;
}

const dbInfo= async()=>{
    return await Recipe.findAll({
      include:{
        model: TipoDieta,
        atribbutes: ['Nombre'],
        through:{
          atribbutes: [],
        }
      }
    })
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes",async(req,res)=>{
  let {name}= req.query;
  
  
  try{


    let info= await apiInfo()
    let infoDb= await dbInfo()
    let infoAlFront= info.concat(infoDb)
   
 
 
   if(!name){
       return  res.send(infoAlFront)
   }else{
 
     name= name.replace("%20"," ")
     
     let busqueda=[]
     let nombre=name.toLowerCase()
 
     
     for(let i=0;i<infoAlFront.length;i++){
           let comprobacion= infoAlFront[i].Nombre
           let comprobacionLower= comprobacion.toLowerCase()
 
           let palabraExiste= comprobacionLower.search(nombre)
           
           if(palabraExiste !== (-1)){
              busqueda.push(infoAlFront[i])
           }
     }
     console.log(busqueda)
     if(busqueda.length < 1){
       return res.status(500).send("palabra no encontrada")
     }else{
       return res.status(200).send(busqueda)
 
     }
 
   }


  }catch(e){
    return res.status(500).send("error al traer los datos")
  }
  
  
  
  
  
   
   
})



router.get("/recipes/:idReceta",async (req,res)=>{
  let id= req.params.idReceta
  
  let info= await apiInfo()
  let infoDb= await dbInfo()
  let infoAlFront= info.concat(infoDb)

  

  if(id){
    let receta= infoAlFront.filter(elemento => elemento.id == id)
    console.log(receta)
    if(receta.length){
      return res.json(receta)

    }else{
      return res.status(500).send("no hay ninguna receta con ese id")
    }
  }
  

})




router.post("/recipes", async (req,res)=>{
  let {Nombre,Resumen,NivelHealth,pasos,createDB,dieta}= req.body
  console.log(req.body)

  if(!Nombre || !Resumen ){
     return res.status(404).send("Falta enviar datos obligatorios")
  }
  

  try{
    
     
     
     const nuevoRecipe=await Recipe.create({
         Nombre,
         Resumen,
         NivelHealth,
         pasos,
         createDB
     })

     const dietas= await TipoDieta.findAll({
        where:{Nombre:dieta}
     })
     
     nuevoRecipe.addTipoDieta(dietas)
     
     
     
     if(nuevoRecipe){
         return res.status(201).json(nuevoRecipe)
     }
     
     

  }catch(e){
     res.status(404).send("error cargando receta")
  }
})



router.get("/diets",async (req,res)=>{
   const infoApi= await apiInfo()
   const diets= infoApi.map(el => el.dieta)
   
  let arrayConTodasLasDietas=[]
  for(let i=0; i< diets.length;i++){
    if(diets[i]!== []){

      for(let j=0; j< diets[i].length;j++){
        arrayConTodasLasDietas.push(diets[i][j])
      }  

    }
  }
  
   
   
   arrayConTodasLasDietas.push("vegetarian")

   let dietaSinDuplicados= new Set(arrayConTodasLasDietas)

   let dietas= Array.from(dietaSinDuplicados)
  dietas.forEach(el =>{
      TipoDieta.findOrCreate({
        where: {Nombre: el}
      })
  })
   
   
  /*for(let i=0; i< dietas.length;i++){
     await TipoDieta.create({Nombre:dietas[i]})
  }*/
   
  /*let dieta=["Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"]
  
  for(let i=0; i< dieta.length;i++){
     await TipoDieta.create({Nombre:dieta[i]})
  }*/

   const dietasDb= await TipoDieta.findAll();

   res.send(dietasDb)
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
