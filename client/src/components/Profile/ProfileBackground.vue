<template>
  <svg viewBox="0 0 1280 353" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    :class="`pokemon-color__icon--${mainPokemonType}`"
    d="M0 104.738C0 104.738 254.5 4.15973 354.5 1.00003C454.5 -2.15967 797 104.738 797 104.738H1280V353H0V104.738Z"
    fill-opacity="0.51"
  />
  </svg>
</template>

<script>
export default {
  name: 'profile-background',
  props: {
    mainPokemonType: {
      type: String,
      required: true
    },
  }
}
</script>
