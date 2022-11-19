<template>
  <Layout>
    <div class="pokeatlas-container">
      <section class="pokedex-list">
        <div class="pokedex-list__inputs-wrapper">
          <!-- <fm-input
            class="pokedex-list__input"
            placeholder="Search"
            icon="magnifier"
            type="text"
            v-model="filters.search"
          /> -->

          <!-- <fm-select
            class="pokedex-list__input"
            placeholder="Show All"
            icon="chevron-down"
            type="number"
            v-model="filters.type"
            :options="types"
          /> -->
        </div>
        
        <div class="pokedex-list__pokemons-list">
          <pokemon-card
            v-for="pokemon in $page.allPokemons.edges"
            :key="pokemon.node.id"
            :identifier="pokemon.node.id"
            :name="pokemon.node.name"
            :image="pokemon.node.image"
            :types="pokemon.node.types"
          />
        </div>

          <!-- <img
            v-show="loading"
            class="pokedex-list__loading-pokeball"
            src="/images/loading-pokeball.gif"
            alt="Loading Pokeball"
          /> -->
      </section>
    </div>
  </Layout>
</template>

<page-query>
query allPokemons {
	allPokemons(order: ASC) {
		edges {
      node {
        name
        id
        image
        types
      }
    }
  }
}
</page-query>

<script>
import PokemonCard from "../components/PokemonCard.vue"

export default {
  metaInfo: {
    title: 'Pokedex'
  },
  components: {
    PokemonCard
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
