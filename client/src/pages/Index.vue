<template>
  <Layout>
    <section class="pokedex-list">
      <div class="pokedex-list__inputs-wrapper">
        <fm-input
          class="pokedex-list__input"
          placeholder="Search"
          icon="magnifier"
          type="text"
          v-model="filters.search"
        />

        <fm-select
          class="pokedex-list__input"
          placeholder="Show All"
          icon="chevron-down"
          type="number"
          v-model="filters.type"
          :options="types"
        />
      </div>
      
      <div class="pokedex-list__pokemons-list">
        <pokemon-card
          v-for="pokemon in filteredPokemons"
          :key="pokemon.node.id"
          :identifier="pokemon.node.id"
          :name="pokemon.node.name"
          :image="pokemon.node.image"
          :types="pokemon.node.types"
        />
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
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

  allPokemonTypes(order: ASC){
    edges {
      node {
        id 
      }
    }
  }
}
</page-query>

<script>
import FmInput from "@/components/FmInput"
import FmSelect from "@/components/FmSelect"

import PokemonCard from "../components/PokemonCard.vue"

export default {
  metaInfo: {
    title: 'Pokedex'
  },
  components: {
    FmInput,
    FmSelect,
    PokemonCard
  },
  data() {
    return {
      filters: {
        search: undefined,
        type: undefined,
      }
    }
  },
  computed: {
    types() {
      const types = this.$page.allPokemonTypes.edges.map(pokemon => {
        return pokemon.node.id
      })

      return types
    },
    filteredPokemons() {
      const pokemons = this.$page.allPokemons.edges

      if (!pokemons) {
        return null
      }

      let filteredPokemons = [...pokemons]

      if (this.filters.search) {
        filteredPokemons = filteredPokemons.filter(({ node: { name } }) => {
          return name.includes(this.filters.search)
        })
      }

      if (this.filters.type) {
        filteredPokemons = filteredPokemons.filter(({ node: { types } }) => {
          return types.includes(this.filters.type)
        })
      }

      return filteredPokemons
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_flex.scss";
@import "@/assets/scss/_mixins.scss";

.pokedex-list {
  @extend .flex-column;

  gap: 30px;
  margin-bottom: 20px;
  @include media('tablet', 'min') {
    gap: 20px;
    margin-bottom: 93px;
  }

  &__input {
    @include media('tablet', 'min') {
      width: 200px;
    }
  }

  &__inputs-wrapper {
    margin-top: 23px;

    gap: 17px;
    display: flex;
    flex-direction: column;

    @include media('tablet', 'min') {
      margin-top: 30px;

      gap: 21px;
      flex-direction: row;
      justify-content: flex-end;
    }
  }

  &__pokemons-list {
    display: grid;
    gap: 15px;

    @include media('tablet', 'min') {
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
    }

    @include media('tablet', '>') {
      grid-template-columns: repeat(4,1fr);
      gap: 20px;
    }
  }

  &__loading-pokeball {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 80px;
    z-index: 5;
  }
}
</style>
