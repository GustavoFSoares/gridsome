<template>
  <section class="pokedex-profile">
    <div class="pokedex-profile__showcase">
      <g-image
        class="pokedex-profile__image"
        :src="pokemon.image"
        :alt="pokemon.name"
      />

      <h1 class="pokedex-profile__name">{{pokemonId | idNormalizer }} {{ pokemon.name }}</h1>

      <profile-background
        class="pokedex-profile__background-decorator"
        :main-pokemon-type="mainPokemonType"
      />
    </div>

    <div class="pokedex-profile__stats">
      <pokemon-statistics
        :types="pokemon.types"
        :stats="pokemon.stats"
        :descriptions="pokemon.flavorTexts"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios"

import ProfileBackground from "@/components/Profile/ProfileBackground.vue";
import PokemonStatistics from "@/components/Profile/PokemonStatistics/index.vue";

export default {
  name: 'pokedex-profile',
  components: {
    ProfileBackground,
    PokemonStatistics,
  },
  data() {
    return {
      pokemon: {}
    }
  },
  computed: {
    pokemonId() {
      return this.$route.params.pokemonId
    },
    mainPokemonType() {
      if (!this.pokemon || !this.pokemon.types) {
        return 'no-defined'
      }

      const [mainType] = this.pokemon.types

      return mainType || 'no-defined'
    },
  },
  methods: {
    async getPokemon() {
      try {
        const { data } = await axios.get(`http://localhost:3000/pokemons/${this.pokemonId}`)
        this.pokemon = data
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getPokemon()
    // this.getPokemonTypes()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_flex.scss";
@import "@/assets/scss/_colors.scss";
@import "@/assets/scss/_fonts.scss";
@import "@/assets/scss/_mixins.scss";

.pokedex-profile {
  @extend .flex;

  margin-top: 10px;
  flex-direction: column;
  min-height: 80vh;

  @include media('tablet', 'min') {
    gap: 20px;
    margin-top: 13px;
    flex-direction: row;

    max-width: 860px;
    margin-left: auto;
    margin-right: auto;
  }

  &__showcase {
    @extend .flex-column;
    @extend .flex-center-center;
    gap: 16px;

    position: relative;
    @include media('tablet', 'min') {
      width: 100%;
      position: initial;
    }
  }

  &__image {
    width: 200px;

    @include media('tablet', 'min') {
      width: 362px;
    }
  }

  &__name {
    padding: 9px 0;
    font-size: 30px;
    @extend .flex-center;
    @extend .fm-text-color-1;
    @extend .fm-font-weight-bold;
    @extend .fm-font-align-center;
    text-transform: capitalize;

    @include media('tablet', 'min') {
      font-size: 45px;
    }
  }

  &__stats {
    @include media('tablet', 'min') {
      width: 100%;
      max-width: 420px;
    }
  }

  &__background-decorator {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
