const express = require('express');
const {
    createPokemonTeam,
    createPokemonTeamBasedOnPokemon
} = require('../controllers/pokemonAIController');


const router = express.Router();

router.route('/generateTeamAnyPokemon')
    .post(createPokemonTeam);

router.route('/generateTeamFromMyPokemon')
    .post(createPokemonTeamBasedOnPokemon);

module.exports = router;

