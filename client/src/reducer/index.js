const initialState = {
    recetas:[],
    recetasPersistentes:[],
    dietas:[],
    detalle:[]
  };


  function rootReducer(state = initialState, action) {
    
    switch(action.type){
        case "GET_RECIPES":
            return {
                ...state,
                recetas: action.payload,
                recetasPersistentes: action.payload
            }
        
        case "FILTER_BY_DIET":
            const allRecipes = state.recetasPersistentes
            
            let recetasFiltradas = []

            if(action.payload === "todas"){
                recetasFiltradas=allRecipes;
            }
            else if(action.payload === "vegetarian"){
                  for(let i=0;i< allRecipes.length; i++ ){
                      if(allRecipes[i].vegetarian === true){
                        recetasFiltradas.push(allRecipes[i])
                      }
                  }
                  for(let i=0; i< allRecipes.length; i++){
                    for(let j=0;j< allRecipes[i].TipoDieta.length; j++){
                         if(allRecipes[i].TipoDieta[j].Nombre === action.payload){
                              recetasFiltradas.push(allRecipes[i])
                         }
                    }
                }
            
            }else{

                
                for(let i=0; i< allRecipes.length; i++){
                    for(let j=0;j< allRecipes[i].TipoDieta.length; j++){
                         if(allRecipes[i].TipoDieta[j].Nombre === action.payload){
                              recetasFiltradas.push(allRecipes[i])
                         }
                    }
                }


            }
            
            
            
            return {
                ...state,
                recetas: recetasFiltradas
                
            }
            case "GET_RECIPES_ID":
                return{
                  ...state,
                  detalle:action.payload
                }
            case "ORDER_BY_SALUDABLE":
                let ordenamiento=[]
                if(action.payload==="noSaludable"){
                   ordenamiento= state.recetas.sort(((a, b) => a.NivelHealth - b.NivelHealth));

                    
                }else if(action.payload==="saludable"){
                    ordenamiento= state.recetas.sort(((a, b) => b.NivelHealth - a.NivelHealth));
                }
                    
                return{
                  ...state, 
                  recetas: ordenamiento 
                }
            
            case "ORDER_BY_NAME":
                let ordenados= action.payload === "asc" ?
                   state.recetas.sort(function (a,b){
                        if(a.Nombre > b.Nombre){
                            return 1;
                        }
                        if(b.Nombre > a.Nombre){
                            return -1;
                        }
                        return 0;
                   }) : 
                   state.recetas.sort(function(a,b){
                    if(a.Nombre > b.Nombre){
                        return -1;
                    }
                    if(b.Nombre > a.Nombre){
                        return 1;
                    }
                    return 0;
                   })
                return {
                    ...state,
                    recetas: ordenados
                }
            case "GET_BY_NAME":
                
                if(action.payload[0] === "ERROR"){
                    return {
                        ...state,
                        recetas: []
                    }

                }else{

                    return {
                        ...state,
                        recetas: action.payload
                    }
                }
            case "POST_RECETA":
                return{
                       ...state
                }
            case "GET_DIETS":
                return{
                    ...state,
                    dietas: action.payload
                }
        default:
            return state;
    }
    
  }
  
  export default rootReducer;