import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_BYNAME = "GET_BYNAME";
export const GET_BYNAME_ERROR = "GET_BYNAME_ERROR";
export const GET_DIET = "GET_DIET";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const CLEAR_DETAILS = "CLEAR_DETAILS";
export const SORT_BY_NAME = "SORT_BY_NAME";
export const SORT_BY_HEALTY_SCORE = "SORT_BY_HEALTY_SCORE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

export const getRecipes = () => {
  return async (dispatch) => {
    let allRecipes = await axios.get("http://localhost:3001/recipes");
    return dispatch({ type: GET_RECIPES, payload: allRecipes.data });
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    let recipeId = await axios.get(`http://localhost:3001/recipes/${id}`);
    return dispatch({ type: GET_DETAILS, payload: recipeId.data });
  };
};

export const getRecipeByName = (name) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `http://localhost:3001/recipes?name=${name}`
      );
      return dispatch({ type: GET_BYNAME, payload: response.data });
    } catch (error) {
      return dispatch({ type: GET_BYNAME_ERROR, payload: name });
    }
  };
};

export const getDiet = () => {
  return async (dispatch) => {
    let diet = await axios.get("http://localhost:3001/diets");
    return dispatch({ type: GET_DIET, payload: diet.data });
  };
};

export const postRecipe = (payload) => {
  return async () => {
    return await axios.post("http://localhost:3001/recipes/create", payload);
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

/*------------------------------------------------------------------* * 
                                                                    * *
                          FILTROS                                   * *
                                                                    * *
--------------------------------------------------------------------* */

export const sortByName = (value) => {
  return {
    type: SORT_BY_NAME,
    payload: value,
  };
};

export const sortByHealtyScore = (value) => {
  return {
    type: SORT_BY_HEALTY_SCORE,
    payload: value,
  };
};

export const filterByDiets = (value) => {
  return {
    type: FILTER_BY_DIET,
    payload: value,
  };
};
