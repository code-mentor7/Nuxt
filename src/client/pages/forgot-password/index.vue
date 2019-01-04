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
            <v-toolbar-title class="headline font-enforce font-weight-thin">Forgot Password</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-form @submit.prevent="forgotPass">
            <v-card-text>
              <v-text-field
                v-model.trim="email"
                :error-messages="$helpers.checkError('email', validationProps, $v)"
                prepend-icon="person"
                name="email"
                label="Email"
                type="text"
                @input="$v.email.$touch()"/>
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
                @click.prevent="forgotPass">SUBMIT</v-btn>
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
  email
} from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
// import { Accounts } from "meteor/accounts-base"
// import { mapGetters, mapActions } from "vuex"

export default {
  auth: false,
  layout: "noFooterTransparentNav",
  mixins: [validationMixin],
  middleware: ["guest-only"],
  data () {
    return {
      email: null,
      submitted: false,
      isAlert: false,
      alertType: "success",
      message: "",
      validationProps: {
        email: {
          required,
          email
        }
      }
    }
  },
  methods: {
    // ...mapActions("layout", [
    //   "setupSnackbar",
    //   "setLoading"
    // ]),
    forgotPass () {
      this.isAlert = false
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submitted = true
        this.$axios.$post("/api/auth/forgot-password", { email: this.email })
          .then(response => {
            this.submitted = false
            this.$nuxt.$router.push("/")
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: "Instructions to reset your password has been sent to your inbox.",
              type: "success"
            })
          })
          .catch((err) => {
            this.submitted = false
            this.$v.$reset()
            let type = "error"
            let msg = "Email invalid."
            if (err.response.status === 403) {
              type = "warning"
              msg = "Please verify your account first."
            }
            if (err.response.status === 418) {
              type = "error"
              msg = "Your account is locked. Please contact support for further assistance"
            }
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
            })
          })
        // Accounts.forgotPassword({ email: this.email }, (err, res) => {
        //   this.isAlert = true
        //   this.submitted = false
        //   this.setLoading(false)
        //   let msg = "Instructions has been sent to your email to reset your password"
        //   let type = "success"
        //   if (err) {
        //     type = "error"
        //     msg = "Invalid email address"
        //     // if(err.error && err.error == 403){
        //     //     msg = err.reason;
        //     // }
        //   }
        //   this.setupSnackbar({
        //     show: true,
        //     text: msg,
        //     type: type
        //   })
        // })
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
