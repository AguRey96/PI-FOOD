const axios = require("axios");
const { Recipe, Diet } = require("./db");
const { API_KEY } = process.env;
// Api Information
//https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true
//`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
//"https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
const getApiInfo = async () => {
  const apiSpoon = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );
  apiData = await apiSpoon.data.results.map((recipes) => ({
    id: recipes.id.toString(),
    name: recipes.title,
    summary: recipes.summary.replace(/<[^>]+>/g, ""),
    healthyScore: recipes.healthScore,
    steps: recipes.analyzedInstructions[0]?.steps.map((s) => ({
      number: s.number,
      step: s.step,
    })),
    image: recipes.image,
    dishTypes: recipes.dishTypes,
    diets: recipes.diets.map((s) => s),
  }));
  return apiData;
};

//DataBase Information

const getDbInfo = async () => {
  const dbData = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbData;
};

//Api and DataBase information.

const getAllInfo = async () => {
  const apiData = await getApiInfo();
  const dbData = await getDbInfo();
  const allInfo = apiData.concat(dbData);
  return allInfo;
};

module.exports = { getApiInfo, getDbInfo, getAllInfo };
