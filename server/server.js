const express = require("express");
const Actions = require("./actions");

const POKEAPI = 'https://pokeapi.co/api/v2/'

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  return res.json(Actions.pokemons)
});

app.get("/missing", async (req, res) => {
  
  const missingPokemons = Actions.pokemons.reduce((amount, pokemon) => {
    if(Array.isArray(pokemon.types) && pokemon.types.length === 0) {
      amount += 1;
    }

    return amount
  }, 0)

  return res.json(missingPokemons);
});

Actions.loadPokemons()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

