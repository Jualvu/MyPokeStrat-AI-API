const express = require("express");
const {
  getAllPokemon,
  getPokemon,
  deletePokemon,
} = require("../controllers/pokemonsController");

const router = express.Router();

router.route("/").get(getAllPokemon);

router.route("/:id").get(getPokemon).delete(deletePokemon);

module.exports = router;
