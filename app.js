const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
require("dotenv").config();
// const morgan = require("morgan");
// const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

//Load env

//Route files
const pokemonAITeamRoutes = require('./routes/pokemonAIRoutes');
const pokemonRoutes = require('./routes/pokemonsRoutes');
const userRoutes = require('./routes/usersRoutes');
const ErrorResponse = require('./utils/errorResponse');

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
app.use('/api/v1/pokemonAITeam', pokemonAITeamRoutes);
app.use('/api/v1/pokemon', pokemonRoutes);
app.use('/api/v1/user', userRoutes);


app.get("/", (req, res) => res.send("Express on Vercel"));

//no route found error handler
app.use((req, res, next) => {
  return next(
    new ErrorResponse("Could not find this route", 404)
  );
})



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;


