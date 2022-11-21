const axios = require("axios");

const POKEAPI = "https://pokeapi.co/api/v2";

const Actions = {
  pokemons: [],
  totalPokemons: 0,
  offset: 0,
  loadPokemons: async () => {
    const { data } = await axios.get(`${POKEAPI}/pokemon`, {
      params: {
        offset: Actions.offset,
        limit: 1154,
      },
    }).catch(e => {
      console.log(e);
    });

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
  getPokemonById: (pokemonId) => {
    const pokemon = Actions.pokemons.find(({ id }) => id === pokemonId)

    return pokemon || null
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
      stats: data.stats.reduce((amount, statData) => {
        amount[statData.stat.name] = statData.base_stat;

        return amount;
      }, {})
    };

    Actions.updatePokemon(pokemonData, currentPokemonIndex);
    Actions.getSpecieData(pokemonData, currentPokemonIndex);
  },
  getSpecieData: async ({ id }, currentPokemonIndex) => {
    let speciesData;

    try {
      const { data: speciesDataRequest } = await axios.get(
        `${POKEAPI}/pokemon-species/${id}`
      );
      speciesData = speciesDataRequest;
    } catch (e) {
      console.error("Error trying get pokemon specie data", id);
    }

    let flavorTexts;
    if (speciesData) {
      flavorTexts = speciesData.flavor_text_entries
        .filter(({ language }) => language.name === "en")
        .map((flavorText) => flavorText.flavor_text);
    } else {
      flavorTexts = ["?"];
    }

    Actions.updatePokemon({ flavorTexts }, currentPokemonIndex);
  },
  loadTypes: async () => {
    const { data } = await axios.get(`${POKEAPI}/type`);

    const mappedTypes = data.results.map(pokemonType => pokemonType.name)

    return mappedTypes
  }
};

module.exports = Actions;
