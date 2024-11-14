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
    origin: ['http://localhost:5173', 'https://mypokestrat.netlify.app'],
    methods: ['POST']
  })
)

//Use routers
app.use('/api/v1/pokemonAITeam', pokemonAITeam);

app.get("/", (req, res) => res.send("Express on Vercel"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;


