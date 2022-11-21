const express = require("express");
const cors = require("cors");

const Actions = require("./actions");

const app = express();
const port = 3000;

app.use(cors())

app.get("/pokemons", async (req, res) => {
  return res.json(Actions.pokemons)
});

app.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params
  const pokemonData = await Actions.getPokemonById(id)
  
  return res.json(pokemonData);
});

app.get("/pokemon-types", async (req, res) => {
  const pokemonTypes = await Actions.loadTypes()
  
  return res.json(pokemonTypes);
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

