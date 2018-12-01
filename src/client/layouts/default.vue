<template>
  <v-app>
    <top-nav />
    <v-content
      app
    >
      <snackbar />
      <nuxt/>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import BottomFooter from "~/components/BottomFooter.vue"
import Snackbar from "~/components/Snackbar.vue"
import TopNav from "~/components/TopNav.vue"

export default {
  components: {
    BottomFooter,
    Snackbar,
    TopNav
  },
  methods: {
  }
}
</script>

<style>
.signin-bg{
    min-height: 30em;
    background-image: url("~assets/img/signin-bg.jpg") !important;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
/* remove spindown buttons in number type inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.cantseeme {
    display:none
}
</style>
