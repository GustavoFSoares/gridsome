const axios = require("axios");

const POKEAPI = "https://pokeapi.co/api/v2";

const Actions = {
  pokemons: [],
  totalPokemons: 0,
  offset: 0,
  loadPokemons: async () => {
    console.log("LOAD", `${POKEAPI}/pokemon`);
    const { data } = await axios.get(`${POKEAPI}/pokemon`, {
      params: {
        offset: Actions.offset,
        // limit: 100,
      },
    }).catch(e => {
      console.log(e);
    });

    console.log(data);

    // Actions.totalPokemons = data.count

    const mappedPokemons = data.results.map((pokemon) => {
      let [pokemonId] = pokemon.url.match(/\d+\/$/g);
      pokemonId = pokemonId.replace("/", "");

      return {
        id: pokemonId,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
        types: [],
      };
    });
    Actions.storePokemons(mappedPokemons);

    Actions.tryGetPokemonsData();
  },
  storePokemons: (pokemon) => {
    Actions.pokemons = [...pokemon];
  },
  updatePokemon: (pokemonData, index) => {
    Actions.pokemons[index] = {
      ...Actions.pokemons[index],
      ...pokemonData,
    };
  },
  tryGetPokemonsData: async () => {
    let currentPokemonIndex = 0
    console.log("tryGetPokemonsData");
    do {
      const pokemon = Actions.pokemons[currentPokemonIndex]

      try {
        await Actions.getPokemonData(
          pokemon,
          currentPokemonIndex
        );

        currentPokemonIndex += 1;
        Actions.totalPokemons = currentPokemonIndex;
      } catch (e) {
        // if (!pokemon.tried) {
        //   console.info("Tring get pokemon again.", pokemon.id);
        //   return await tryGetPokemonData.tryGetPokemonData({
        //     ...pokemon,
        //     tried: true,
        //   });
        // }
  
        console.error("Error loading pokemon data.", pokemon.id);
        // throw e;
      }

      console.log(Actions.pokemons.length, Actions.totalPokemons);
    } while(Actions.pokemons.length !== Actions.totalPokemons)
  },
  getPokemonData: async ({ id }, currentPokemonIndex) => {
    const { data } = await axios.get(`${POKEAPI}/pokemon/${id}`);

    const pokemonData = {
      id,
      types: data.types.map((pokemonType) => pokemonType.type.name),
    };

    console.log(pokemonData);
    // return pokemonData
    Actions.updatePokemon(pokemonData, currentPokemonIndex);

    // commit("STORE_SPECIFIC_POKEMONS", pokemonData);
  },
};

module.exports = Actions;
