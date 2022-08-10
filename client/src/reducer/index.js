const initialState = {
    recetas:[],
    recetasPersistentes:[]
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
        default:
            return state;
    }
    
  }
  
  export default rootReducer;