const express = require("express");
const {
  getAllPokemon,
  getPokemon,
  deletePokemon,
  createPokemon,
} = require("../controllers/pokemonsController");

const router = express.Router();

router.route("/")
  .get(getAllPokemon)
  .post(createPokemon)

router.route("/:id")
  .get(getPokemon)
  .delete(deletePokemon)
  

module.exports = router;
