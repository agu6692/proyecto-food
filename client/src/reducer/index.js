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
        default:
            return state;
    }
    
  }
  
  export default rootReducer;