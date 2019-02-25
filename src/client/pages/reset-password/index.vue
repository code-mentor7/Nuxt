<template>
  <v-container
    fluid
    fill-height
    class="signin-bg">
    <v-layout
      align-center
      justify-center>
      <v-flex
        xs12
        sm8
        md4>
        <v-card
          v-if="resetPasswordStatus"
          class="elevation-10">
          <v-toolbar
            dark
            class="blue-gradient">
            <v-spacer/>
            <v-toolbar-title class="headline font-enforce font-weight-thin">Reset Password</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form @submit.prevent="resetPass">
            <v-card-text>
              <v-text-field
                :error-messages="$helpers.checkError('password', validationProps, $v)"
                v-model="password"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :type="showPassword ? 'text' : 'password'"
                autofocus
                prepend-icon="lock"
                name="password"
                label="Password"
                counter
                @input="$v.password.$touch(); $v.confirm_password.$touch()"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                :error-messages="$helpers.checkError('confirm_password', validationProps, $v, 'Password')"
                v-model="confirm_password"
                :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="confirm_password"
                label="Confirm Password"
                counter
                @input="$v.confirm_password.$touch(); $v.password.$touch()"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{name:`signin___${$i18n.locale}`}"
                class="primary--text"
                flat
                exact>SIGN IN</v-btn>
              <v-spacer/>
              <v-btn
                :loading="submitted"
                class="light-blue accent-3 white--text"
                type="submit"
                @click.prevent="resetPass">SUBMIT</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card
          v-else
          class="elevation-10">
          <div class="display-2">Link invalid/expired.
          You will be redirected in {{ timerCountdown }} seconds.</div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {
  required,
  sameAs
} from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
import { mapState } from "vuex"

export default {
  auth: false,
  layout: "noFooterTransparentNav",
  middleware: ["guest-only"],
  mixins: [validationMixin],
  async fetch ({ app, store, redirect, route }) {
    try {
      if (route.query.i === undefined) {
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Link invalid/expired. Request for a new forgot password email.",
          type: "error"
        })
        app.store.dispatch("setResetPasswordStatus", false)
      }
      else {
        await app.$axios.$post("/api/auth/verify-token", { i: route.query.i })
        app.store.dispatch("setResetPasswordStatus", true)
      }
    }
    catch (err) {
      app.store.dispatch("setupSnackbar", {
        show: true,
        text: "Link invalid/expired. Request for a new forgot password email.",
        type: "error"
      })
      app.store.dispatch("setResetPasswordStatus", false)
    }
  },
  data () {
    return {
      alertType: "success",
      confirm_password: null,
      isAlert: false,
      message: "",
      password: null,
      showPassword: false,
      showConfirmPassword: false,
      submitted: false,
      timerCountdown: 5,
      validationProps: {
        password: {
          required
        },
        confirm_password: {
          sameAsPassword: sameAs("password")
        }
      }
    }
  },
  computed: {
    ...mapState({
      resetPasswordStatus: state => state.resetPasswordStatus
    })
  },
  mounted () {
    if (this.resetPasswordStatus === false) {
      setTimeout(() => {
        this.$nuxt.$router.push({ name: `forgot-password___${this.$i18n.locale}` })
      }, 5000)
      setInterval(() => {
        this.timerCountdown--
      }, 5000)
    }
  },
  methods: {
    resetPass () {
      this.isAlert = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitted = true
        this.$axios.$post("/api/auth/reset-password", { i: this.$route.query.i, password: this.password })
          .then(() => {
            this.submitted = false
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: "Password reset successful.",
              type: "success"
            })
          })
          .catch(() => {
            this.submitted = false
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: "Reset failed. Request for a new forgot password email.",
              type: "error"
            })
          })
      }
    }
  },
  validations () {
    return this.validationProps
  }

}
</script>

<style>

</style>
