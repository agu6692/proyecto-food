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
    console.log(payload)
    return {
        type : "ORDER_BY_NAME",
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
        console.log(err)
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