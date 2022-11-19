<template>
  <a
    class="card"
    :href="`/list/${identifier}`"
  >
    <div class="card__image">
      <img :src="image" :alt="name" />
    </div>

    <div
      class="card__container"
      :class="`pokemon-color__background--${mainPokemonType}`"
    >
      <div class="card__header">
        <span class="card__identifier">{{ identifier | idNormalizer }}</span>
      </div>

      <div class="info">
        <div class="info__container">
          <div class="info__wrapper">
            <div class="info__pokemon-types">
              <img
                v-for="type in types"
                :key="type"
                :alt="`Pokemon type:${type}`"
                class="info__pokemon-types-item"
                :class="`info__pokemon-types-item--${type}`"
                :src="`/images/pokemon-types/${type}.png`"
              />
            </div>

            <div class="info__pokemon-name">
              <h4
                class="info__pokemon-name-text"
                :class="`pokemon-color__text--${mainPokemonType}`"
              >{{ name }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: 'pokemon-card',
  props: {
    identifier: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    types: {
      type: Array,
      default: () => []
    },
    image: {
      type: String
    }
  },
  computed: {
    mainPokemonType() {
      const [mainType] = this.types
      return mainType || 'no-defined'
    }
  }
}
</script>
