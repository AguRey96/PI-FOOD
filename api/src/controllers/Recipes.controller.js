const { getAllInfo, getApiInfo } = require("../getInfo");
const { Recipe, Diet } = require("../db");

const getRecipe = async (name) => {
  const recipes = await getAllInfo();
  if (name) {
    const recipeName = recipes.filter((r) => {
      return r.name.toLowerCase().includes(name.toLowerCase());
    });
    if (recipeName.length) return recipeName;
    else throw new Error("Recipe not found with that name");
  } else return recipes;
};

const getRecipeById = async (id) => {
  if (id.length > 35) {
    const finded = Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: ["name", "id"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (finded) return finded;
    else throw new Error("Recipe not found with that id");
  }
  const searched = await getApiInfo();
  const finded = searched.find((r) => r.id === id);
  if (finded) return finded;
  else throw new Error("Recipe not found with that id");
};

const postRecipe = async (
  name,
  summary,
  steps,
  healthScore,
  image,
  diets,
  dishTypes
) => {
  if (!name || !summary) throw new Error("Missing data");
  if (healthScore < 0 || healthScore > 100)
    throw new Error("health score must be between 0 and 100");
  if (/[^a-zA-Z, ]/g.test(name))
    throw new Error("Name could be letters, no symbols!");

  const newRecipe = await Recipe.create({
    name,
    summary,
    steps,
    healthScore,
    image: image
      ? image
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png",
    dishTypes,
  });

  const dietDb = await Diet.findAll({ where: { name: diets } });
  newRecipe.addDiet(dietDb);

  return newRecipe;
};

module.exports = { getRecipe, getRecipeById, postRecipe };
