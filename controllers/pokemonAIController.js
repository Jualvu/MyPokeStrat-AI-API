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
                    "text": `Based on the following list of 6 pokemon names to form my rival pokemon team: ${req.body.pokemonTeam},
                             I want you to:

                            With that information, you must generate an object in JSON format with a column called 'pokemonTeam'
                            and another column called 'message'. In the 'pokemon_team' column I want you to generate a list of
                            6 numbers representing the IDs of each pokemon in a pokemon team that can effectively defeat
                            my rival's pokemon team, and in the 'message' column I want you to generate a short
                            message explaining why that team can defeat it.`
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