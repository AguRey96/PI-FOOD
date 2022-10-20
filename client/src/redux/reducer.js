import {
  FILTER_BY_DIET,
  SORT_BY_NAME,
  SORT_BY_HEALTY_SCORE,
  GET_DETAILS,
  GET_BYNAME,
  GET_DIET,
  GET_RECIPES,
  CLEAR_DETAILS,
} from "./actions";

let initialState = {
  allRecipes: [],
  detail: [],
  diet: [],
  recipes: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_BYNAME:
      return {
        ...state,
        allRecipes: action.payload,
      };

    case GET_DIET:
      return {
        ...state,
        diet: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        detail: [],
      };

    //-1 es porque i.a < i.b    a-b
    // 1 es porque i.a > i.b    b-a
    // 0 es porque a = b

    case SORT_BY_NAME: {
      let sortName = [...state.allRecipes];
      console.log(action.payload);
      sortName.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "A-Z" ? 1 : -1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "A-Z" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allRecipes: sortName,
      };
    }

    case SORT_BY_HEALTY_SCORE: {
      let sortHScore = [...state.allRecipes];
      sortHScore.sort((a, b) => {
        if (a.healthyScore > b.healthyScore) {
          return action.payload === "Asc" ? 1 : -1;
        }
        if (a.healthyScore < b.healthyScore) {
          return action.payload === "Asc" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allRecipes: sortHScore,
      };
    }

    case FILTER_BY_DIET: {
      let filterDiets =
        action.payload === "All"
          ? state.recipes
          : state.recipes.filter((e) => {
              return typeof e.diets[0] === "string"
                ? e.diets.includes(action.payload)
                : e.diets.map((e) => e.name).includes(action.payload);
            });
      console.log(filterDiets);
      return {
        ...state,
        allRecipes: filterDiets,
      };
    }

    default:
      return { ...state };
  }
}
