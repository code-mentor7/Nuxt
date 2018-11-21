<template>
  <h1>asdasd {{ verificationMessage }}</h1>
</template>

<script>
import { mapState } from "vuex"
// TODO: View for user

export default {
  auth: false,
  middleware: ["guest-only"],
  async fetch ({ app, store, redirect, route }) {
    try {
      if (route.query.i === undefined) {
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Verification failed. Request for resend verification email.",
          type: "error"
        })
        app.store.dispatch("setVerificationMessage", false)
      }
      else {
        await app.$axios.$post("/api/auth/verify", { i: route.query.i })
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Verification successful.",
          type: "success"
        })
        app.store.dispatch("setVerificationMessage", true)
      }
    }
    catch (err) {
      console.log("err", err.response.message)
      let text = "Verification failed. Request for resend verification email."
      if (err.response.status === 403) {
        text = "Your account already verified."
      }
      if (err.response.status === 401) {
        text = "Link expired. Request for resend verification email."
      }
      app.store.dispatch("setupSnackbar", {
        show: true,
        text,
        type: "error"
      })
      app.store.dispatch("setVerificationMessage", false)
    }
  },
  computed: {
    ...mapState({
      verificationMessage: state => state.verificationMessage
    })
  },
  mounted () {
    setTimeout(() => {
      // this.$nuxt.$router.push({ name: `signin___${this.$i18n.locale}` })
    }, 5000)
  }
}
</script>

<style>

</style>
