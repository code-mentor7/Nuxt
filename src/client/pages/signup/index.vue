<template>
  <v-container
    fluid
    fill-height
    class="signin-bg"
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-10">
          <v-toolbar
            dark
            class="blue-gradient"
          >
            <v-spacer />
            <v-toolbar-title class="font-weight-thin headline font-enforce">Join Us Now </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-form @submit.prevent="signup">
            <v-card-text>
              <v-text-field
                v-model.trim="email"
                :loading="emailCheckLoading"
                :error-messages="emailErrors "
                :success="emailVerified"
                :success-messages="emailVerifiedMessage"
                prepend-icon="email"
                name="email"
                label="Email"
                type="text"
                @input="$v.email.$touch(); emailInput()"
              />
              <v-text-field
                v-model.trim="name"
                :error-messages="$helpers.checkError('name', validationProps, $v, 'Your Name')"
                prepend-icon="person"
                name="name"
                label="Your Name"
                type="text"
                @input="$v.mobile_number.$touch()"
              />
              <v-text-field
                v-model.trim="mobile_number"
                :error-messages="$helpers.checkError('mobile_number', validationProps, $v, 'Mobile Number')"
                prepend-icon="phone"
                name="mobile_number"
                label="Mobile Number"
                type="number"
                @input="$v.mobile_number.$touch()"
              />
              <v-text-field
                v-model.trim="wechat_id"
                :error-messages="$helpers.checkError('wechat_id', validationProps, $v, 'Wechat ID')"
                prepend-icon="fa fa-wechat"
                name="wechat_id"
                label="Wechat ID"
                type="text"
                @input="$v.wechat_id.$touch()"
              />
              <v-text-field
                v-model="password"
                :error-messages="$helpers.checkError('password', validationProps, $v)"
                :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                :type="showPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="password"
                label="Password"
                counter
                @input="$v.password.$touch(); $v.confirm_password.$touch()"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="confirm_password"
                :error-messages="$helpers.checkError('confirm_password', validationProps, $v, 'Password')"
                :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                :type="showConfirmPassword ? 'text' : 'password'"
                prepend-icon="lock"
                name="confirm_password"
                label="Confirm Password"
                counter
                @input="$v.confirm_password.$touch(); $v.password.$touch()"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
              <v-checkbox
                v-model="tnc"
                :error-messages="$helpers.checkError('tnc', validationProps, $v, 'This')"
                color="primary"
                @change="$v.tnc.$touch()"
              >
                <span slot="label">I agree to the <a
                  href="#"
                  @click.stop="showTnc = true"
                >Terms &amp; Conditions</a> </span>
              </v-checkbox>
            </v-card-text>
            <v-card-actions>
              <v-btn
                :to="{name:`signin___${$i18n.locale}`}"
                class="primary--text"
                flat
                exact
              >SIGN IN</v-btn>
              <v-spacer />
              <v-btn
                :loading="submitted"
                class="light-blue accent-3 white--text"
                type="submit"
                @click.prevent="signup"
              >SIGN UP</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <tnc-dialog
          :show="showTnc"
          @close="showTnc = false"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators"
import { withParams } from "vuelidate/lib/validators/common"
import { validationMixin } from "vuelidate"
import { debounce } from "lodash"
import tncDialog from "~/components/Dialog/TermsAndConditionsDialog.vue"
import { mapState } from "vuex"

const checked = withParams({ type: "checked" }, value => value === true)
const uniqueEmail = withParams({ type: "uniqueEmail" }, value => {
  return value
})
// const uniqueEmail = withParams({type: 'uniqueEmail'}, value => {
//   let today = new Date();
//   let birthDate = new Date(value)
//   let age = today.getFullYear() - birthDate.getFullYear()
//   let m = today.getMonth() - birthDate.getMonth()
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--
//   }
//   return age >= 21 && age <= 100;
// })

export default {
  auth: false,
  head () {
    return this.$helpers.setMetaSEOHead("Sign Up", null, "Sign Up", "Sign Up", this.baseUrl)
  },
  layout: "noFooterTransparentNav",
  middleware: ["guest-only"],
  components: {
    tncDialog
  },
  mixins: [ validationMixin ],
  data () {
    return {
      showTnc: false,
      showPassword: false,
      showConfirmPassword: false,
      merchant_name: "96Travel",
      password: null,
      confirm_password: null,
      mobile_number: null,
      email: null,
      name: null,
      tnc: true,
      submitted: false,
      emailVerified: false,
      emailVerifiedMessage: [],
      emailCheckLoading: false,
      message: "",
      messageType: "error",
      isEmailExist: [],
      validationProps: {
        confirm_password: {
          sameAsPassword: sameAs("password")
        },
        email: {
          required,
          email
          // uniqueEmail
        },
        mobile_number: { required },
        name: { required },
        password: {
          required,
          minLength: minLength(5)
        },
        tnc: { checked },
        wechat_id: {}
      },
      wechat_id: null
    }
  },
  computed: {
    ...mapState({
      baseUrl: state => state.baseUrl
    }),
    emailErrors () {
      const err = this.$helpers.checkError("email", this.validationProps, this.$v)
      return [...err]
      // return [...err, ...this.isEmailExist]
    }
  },
  mounted () {
    this.debouncedSearch = debounce(this.checkEmailValidity, 700)
  },
  methods: {
    signup () {
      // TODO: email custom validation for unique check
      this.$v.$touch()
      if (!this.$v.$invalid && this.emailVerified === true) {
        this.submitted = true
        const attr = {
          name: this.name,
          password: this.password,
          email: this.email,
          contact_number: this.mobile_number,
          wechat_id: this.wechat_id
        }
        this.$helpers.removeEmptyObjectVariable(attr) // Remove empty value prior to create
        let msg = "Account created. We have sent you an email for verification."
        let type = "success"
        this.$axios.$post("/api/auth/signup", attr)
          .then((response) => {
            this.submitted = false
            this.$nuxt.$router.push("/")
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
            })
          })
          .catch(() => {
            this.submitted = false
            this.$v.$reset()
            type = "error"
            msg = "We are unable to sign you up at this moment."
            this.$store.dispatch("setupSnackbar", {
              show: true,
              text: msg,
              type
            })
          })
      }
    },
    emailInput () {
      this.emailVerified = false
      this.emailVerifiedMessage = []
      if (!this.$v.email.$invalid) {
        this.emailCheckLoading = true
        this.debouncedSearch()
      }
    },
    checkEmailValidity () {
      this.$axios.$post("/api/auth/user/check", { email: this.email })
        .then((response) => {
          this.emailCheckLoading = false
          if (response.exists !== "undefined" && response.exists === false) {
            this.emailVerified = true
            this.emailVerifiedMessage = ["Email valid"]
            this.isEmailExist = []
          }
        })
        .catch(() => {
          this.emailCheckLoading = false
          this.isEmailExist = ["Email already exist"]
        })
    }
  },
  validations () {
    return this.validationProps
  }
}
</script>
