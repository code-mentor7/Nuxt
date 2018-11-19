<template>
  <v-app>
    <top-nav />
    <v-content
      :class="contentClass()"
      app
    >
      <snackbar />
      <nuxt/>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
// TODO: Setup Different layout for differen pages, no footer, transparent nav, etc
import BottomFooter from "~/components/BottomFooter.vue"
import Snackbar from "~/components/Snackbar.vue"
import TopNav from "~/components/TopNav.vue"

export default {
  components: {
    BottomFooter,
    Snackbar,
    TopNav
  },
  fetch () {
    console.log("Fetch")
  },
  methods: {
    contentClass () {
      let contentClass = ""
      if (this.checkPathForContentClass()) {
        contentClass = "pa-0"
      }
      return contentClass
    },
    checkPathForContentClass () {
      return (
        this.$route.path === "/" ||
        this.$route.path === "/signin" ||
        this.$route.path === "/signup" ||
        this.$route.path === "/forgot-password" ||
        this.$route.path === "/resend-verification" ||
        this.$route.path.indexOf("reset-password") !== -1
      )
    }
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
