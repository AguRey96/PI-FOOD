const { Router } = require("express");
const router = Router();
const {
  getRecipe,
  getRecipeById,
  postRecipe,
} = require("../controllers/Recipes.controller");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const recipe = await getRecipe(name);
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const search = await getRecipeById(id);
    res.send(search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, summary, steps, healthyScore, image, diets, dishTypes } =
      req.body;
    const result = await postRecipe(
      name,
      summary,
      steps,
      healthyScore,
      image,
      diets,
      dishTypes
    );
    res.status(201).json({ msg: "Add post", result: result });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
