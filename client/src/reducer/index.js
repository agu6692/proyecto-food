const initialState = {
    recetas:[]
  };


  function rootReducer(state = initialState, action) {
    
    switch(action.type){
        case "GET_RECIPES":
            return {
                ...state,
                recetas: action.payload
            }
        case "FILTER_BY_DIET":
            const allRecipes = state.recetas
            const createDB=[]
            for(let i=0; i< allRecipes.length;i++){
                if(allRecipes[i].createDB=== true){
                    createDB.push(allRecipes[i])
                }
            }


            const notCreateDB=[]
            for(let i=0; i< allRecipes.length;i++){
                if(allRecipes[i].createDB=== false){
                    notCreateDB.push(allRecipes[i])
                }
            }
            
            
            return {
                ...state,
                recetas: notCreateDB
                
            }
        default:
            return state;
    }
    
  }
  
  export default rootReducer;