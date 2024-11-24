const Pokemon = require("../models/PokemonModel");

//@desc     Get all pokemon
//@route    GET /api/v1/pokemon
//@access   Public
exports.getAllPokemon = (req, res, next) => {
  res.status(200).json({
    success: "True",
    msg: "Show all pokemon",
  });
};
//@desc     Get single pokemon
//@route    GET /api/v1/pokemon/:id
//@access   Public
exports.getPokemon = (req, res, next) => {
  res.status(200).json({
    success: "True",
    msg: `Show single pokemon ${req.params.id}`,
  });
};

//@desc     Delete pokemon by id
//@route    DELETE /api/v1/pokemon/:id
//@access   Private
exports.deletePokemon = (req, res, next) => {
  res.status(200).json({
    success: "True",
    msg: `Delete pokemon: ${req.params.id}`,
  });
};

//@desc     Create pokemon 
//@route    POST /api/v1/pokemon/:id
//@access   Private
exports.createPokemon = (req, res, next) => {

  const {} = req.body;

  res.status(200).json({
    success: "True",
    msg: `Delete pokemon: ${req.params.id}`,
  });
};
