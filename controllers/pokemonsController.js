const Pokemon = require("../models/PokemonModel");
const ErrorResponse = require("../utils/errorResponse");
 
//@desc     Get all pokemon
//@route    GET /api/v1/pokemon
//@access   Public
exports.getAllPokemon = async(req, res, next) => {

  try{

    const pokemons = await Pokemon.find();

    res.status(200).json({
      success: "True",
      msg: "Show all pokemon",
      count: pokemons.length,
      data: pokemons
    });

  }catch(error){
    return next(new ErrorResponse(`Server Error: ${error}`, 500));
  }
  
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
exports.deletePokemon = async(req, res, next) => {

  try{

    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);


    res.status(200).json({
      success: "True",
      msg: `Delete pokemon: ${req.params.id}`,
      data: deletedPokemon
    });
  }catch(error){
    console.log(error);
    return next(new ErrorResponse(`Server Error`, 500));
  }
  
};

//@desc     Create pokemon 
//@route    POST /api/v1/pokemon/
//@access   Private
exports.createPokemon = async(req, res, next) => {

  try{
    const {pokemonId, pokemonName, pokemonTypes, pokemonImage } = req.body;
    // const {userId} = req.params.userId;

    // if(!userId){
    //   return next(new ErrorResponse(`User id is need it`, 400));
    // }

    if(!pokemonId || !pokemonName || !pokemonTypes || !pokemonImage ){
      return next(new ErrorResponse(`Enter valid data`, 400));
    }

    // const isUserValid = false;
    
    // isUserValid = await User.find(userId);

    // if(!isUserValid){
    //   return next(new ErrorResposne('User not found.', 400));
    // }


    const newPokemon = new Pokemon({
      pokemonId, 
      pokemonName, 
      pokemonTypes, 
      pokemonImage
      // userId
    });

    const savedPokemon = await newPokemon.save();

    res.status(200).json({
      success: "True",
      msg: `Succesfully created pokemon: ${req.body.pokemonName}`,
      data: savedPokemon
    });

  }catch(error){
    console.log(error);
    return next(new ErrorResponse(`Server Error`, 500));
  }
  
};
