const express = require('express');
const {
    createPokemonTeam
} = require('../controllers/pokemonAIController');


const router = express.Router();

router.route('/')
    .post(createPokemonTeam);

module.exports = router;
