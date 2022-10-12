const { Diet } = require("../db");

let dietsArr = [
  "gluten free",
  "dairy free",
  "ketogenic",
  "lacto ovo vegetarian",
  "vegan",
  "pescatarian",
  "paleolithic",
  "primal",
  "fodmap friendly",
  "whole 30",
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
