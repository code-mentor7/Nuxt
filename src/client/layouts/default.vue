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
</style>
