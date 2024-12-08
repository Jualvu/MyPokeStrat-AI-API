const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: [true, "Please add pokemon id"],
    unique: true,
  },
  pokemonName: {
    type: String,
    required: [true, "Please add pokemon name"],
    unique: true,
  },
  pokemonTypes: {
    type: Array,
    required: [true, "Please add pokemon type/s"],
  },
  pokemonImage: {
    type: String,
    required: [true, "Please add pokemon Image"]
  }
});

module.exports = mongoose.model("Pokemon", PokemonSchema);
