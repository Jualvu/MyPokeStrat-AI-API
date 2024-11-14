const express = require('express');
const cors = require('cors');

//Load env
require("dotenv").config();

//Route files
const pokemonAITeam = require('./routes/pokemonAIRoutes');

//Create app
const app = express();

//body parser
app.use(express.json());


app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['POST']
  })
)

//Use routers
app.use('/api/v1/pokemonAITeam', pokemonAITeam);

// const openai = new OpenAI({
//     apiKey: process.env.OPEN_AI_KEY 
// });

// const generarTexto = async(pokemonTeam) => {

//     const response = await openai.chat.completions.create({
//         model: "gpt-4o",
//         messages: [
//           {
//             "role": "user",
//             "content": [
//               {
//                 "type": "text",
//                 "text": `Según la siguiente lista de 6 números donde cada número representa el ID de un pokémon para
//                         conformar un equipo pokémon: ${pokemonTeam}, quiero que:

                        
//                         Con esa información, debes generar un objeto en formato JSON con una columna llamada 'pokemonTeam'
//                         y otra columna llamda 'mensaje'. En la columna 'pokemon_team' quiero que generes una lista de 
//                         6 números representando los ID de cada pokémon en un equipo pokémon que puedan derrotar eficazmente 
//                         al equipo pokémon que recibiste, y en la columna 'mensjae' quiero que me generes un mensaje 
//                         corto explicando por qué ese equipo puede derrotarlo.`
//               }
//             ]
//           }
//         ],
//         response_format: { type: "json_object" }
//       });

//     console.log(response.choices[0].message);
// }

// generarTexto();


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


