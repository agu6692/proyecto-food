import axios from "axios"

export function getRecipes(){
    return async function(dispatch){
    try{
        var json = await axios.get("http://localhost:3001/recipes")
        return dispatch(
            {
                type: "GET_RECIPES",
                payload: json.data
            }
        )
    }

    catch(err){
      console.log(err)
    }
}}

export function filterRecipesByDiet(payload){
    
    return {
        type : "FILTER_BY_DIET",
        payload
    }
}

export function orderByName(payload){
    
    return {
        type : "ORDER_BY_NAME",
        payload
    }
}
export function orderBySaludable(payload){
   
    return {
        type : "ORDER_BY_SALUDABLE",
        payload
    }
}


export function searchByName(name){
    
    return async function(dispatch){

    try{
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        
        
        return dispatch(
            {
                type: "GET_BY_NAME",
                payload: json.data
            }
        )
    }

    catch(err){
        console.log("ERROR EN EL SERVIDOR")
    }
    
}}

export function getDietas(){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/diets")
            return dispatch(
                {
                    type: "GET_DIETS",
                    payload: json.data
                }
            )
        }
    
        catch(err){
          console.log(err)
        }
    }

}

export function postReceta(payload){
    return async function(dispatch){
        try{
            var response = await axios.post("http://localhost:3001/recipes",payload)
            console.log(response)

            return response
        }
    
        catch(err){
          console.log(err)
        }
    }
}

export function getRecipesID(id){
    return async function(dispatch){
        try{
            let response = await axios.get("http://localhost:3001/recipes/"+id)
            return dispatch(
                {
                    type: "GET_RECIPES_ID",
                    payload: response.data
                }
            )

        }catch(err){
            console.log(err)
        }
    }
}