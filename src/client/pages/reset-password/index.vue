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
        <v-card class="elevation-10">
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
                :error-messages="checkError('password', validationProps, $v)"
                v-model="password"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :type="showPassword ? 'text' : 'password'"
                autofocus
                prepend-icon="lock"
                name="password"
                label="Password"
                counter
                @input="$v.password.$touch()"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                :error-messages="checkError('confirm_password', validationProps, $v, 'Password')"
                v-model="confirm_password"
                :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="confirm_password"
                label="Confirm Password"
                counter
                @input="$v.confirm_password.$touch()"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{name:'SignIn'}"
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
// import { Accounts } from "meteor/accounts-base"
// import { mapGetters, mapActions } from "vuex"
// TODO: token expire check when load page only
// TODO: Reset attempt lock
export default {
  auth: false,
  mixins: [validationMixin],
  middleware: ["guest-only"],
  async fetch ({ app, store, redirect, route }) {
    try {
      if (route.query.i === undefined) {
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Reset failed. Request for a new forgot password email.",
          type: "error"
        })
        app.store.dispatch("setResetPasswordStatus", false)
      }
      else {
        await app.$axios.$post("/api/auth/reset-password", { i: route.query.i })
        app.store.dispatch("setupSnackbar", {
          show: true,
          text: "Password reset successful.",
          type: "success"
        })
        app.store.dispatch("setResetPasswordStatus", true)
      }
    }
    catch (err) {
      console.log("err", err.response.message)
      let text = "Reset failed. Request for a new forgot password email."
      if (err.response.status === 403) {
        // text = "Your account already verified."
      }
      if (err.response.status === 401) {
        text = "Link expired. Request for a new forgot password email."
      }
      app.store.dispatch("setupSnackbar", {
        show: true,
        text,
        type: "error"
      })
      app.store.dispatch("setResetPasswordStatus", false)
    }
  },
  data () {
    return {
      showPassword: false,
      showConfirmPassword: false,
      password: null,
      confirm_password: null,
      submitted: false,
      isAlert: false,
      alertType: "success",
      message: "",
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
  methods: {
    ...mapActions("layout", [
      "setupSnackbar",
      "setLoading"
    ]),
    resetPass () {
      this.isAlert = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.setLoading(true)
        this.submitted = true
        Accounts.resetPassword(this.$route.params.token, this.password, (err, res) => {
          this.setLoading(false)
          this.isAlert = true
          this.submitted = false
          let msg = "Successfully reset your password"
          let type = "success"
          if (err) {
            if (err.reason != "Login forbidden") {
              type = "error"
              msg = "Reset password failed. Please try again"
            }
          }
          this.$router.push({ name: "Home" })
          this.setupSnackbar({
            show: true,
            text: msg,
            type: type
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
