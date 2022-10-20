const { Router } = require("express");
const router = Router();
const getDiet = require("../controllers/Diet.controller");

router.get("/", async (req, res) => {
  try {
    diets = await getDiet();
    res.status(200).json({ msg: "Added diet", diets });
  } catch (error) {
    res.status(404).send("Error");
  }
});

module.exports = router;
