const OpenAI = require('openai');

exports.createPokemonTeam = async(req, res, next) => {
    try{

        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY 
        });
        
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": `Based on the following list of 6 pokemon names from my rival's pokemon team: ${req.body.pokemonTeam},
                             I want you to:

                             With that information, you must generate a pokemon Team to defeat rival's pokemon team. To do this you must create a
                             JSON object that has a column called "pokemonTeam", that column is going to
                             have an array of pokemon objects where each one of those will have a column called "pokemonID" with the value of the 
                             pokemon id, and another column called "message" with a short message explaining the role of that 
                             specific pokemon to in the team. There has to be a total of 6 pokemon objects in the "pokemonTeam" column
                             to create the pokemon team to defeat rival's team.`
                    }
                ]
                }
            ],
            response_format: { type: "json_object" }
        });

        // const response = req.body.pokemonTeam;

        res.status(201).json({
            success: true,
            data: response.choices[0].message
        });
        

    }catch (error){
        res.status(400).json({
            success: false
        });
    }
}

exports.createPokemonTeamBasedOnPokemon = async(req, res, next) => {
    try{

        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY 
        });
        
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": `Considering that I can only use the next pokemons: ${req.body.myPokemon}, and
                             based on the following list of 6 pokemon names that represents my rival's pokemon team: ${req.body.pokemonTeam},
                             
                             I want you to:

                             With that information, you must generate a pokemon Team to defeat rival's pokemon team. To do this you must create a
                             JSON object that has a column called "pokemonTeam", that column is going to
                             have an array of pokemon objects where each one of those will have a column called "pokemonID" with the value of the 
                             pokemon id, and another column called "message" with a short message explaining the role of that 
                             specific pokemon to in the team. There has to be a total of 6 pokemon objects in the "pokemonTeam" column
                             to create the pokemon team to defeat rival's team.`
                    }
                ]
                }
            ],
            response_format: { type: "json_object" }
        });


        res.status(201).json({
            success: true,
            data: response.choices[0].message
        });
        

    }catch (error){
        res.status(400).json({
            success: false
        });
    }
}