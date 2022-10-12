const { Diet } = require("../db");

let dietsArr = [
  "gluten free",
  "ketogenic",
  "vegetarian",
  "lacto vegetarian",
  "ovo vegetarian",
  "lacto ovo vegetarian",
  "vegan",
  "pescatarian",
  "paleolithic",
  "primal",
  "fodmap friendly",
  "whole 30",
  "dairy free",
];

const getDiet = () => {
  dietsArr.map((dietName) => {
    Diet.findOrCreate({
      where: { name: dietName },
    });
  });
  const dietTypes = Diet.findAll();
  return dietTypes;
};

module.exports = getDiet;
