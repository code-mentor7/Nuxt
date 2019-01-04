<template>
  <!-- https://codepen.io/johnjleider/pen/EQOYVV -->
  <div v-scroll="onScroll">
    <change-password-dialog
      :show="showChangePass"
      @close="showChangePass = false"
    />
    <v-navigation-drawer
      v-model="sideBarModel"
      :clipped="$vuetify.breakpoint.mdAndUp"
      fixed
      app
      disable-resize-watcher
      disable-route-watcher
      class="blue-gradient"
    >
      <v-list dense>
        <v-list-tile
          :to="{name: `index___${$i18n.locale}`}"
          avatar
          tile
          size="50px"
          exact
        >
          <v-list-tile-avatar>
            <span class="white--text">96</span>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.home') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          :to="{name:`about___${$i18n.locale}`}"
          nuxt
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.aboutUs') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          :to="{name:`cart___${$i18n.locale}`}"
          exact
        >
          <v-badge
            right
            color="orange"
          >
            <span
              v-if="isLoggedIn && customerData.cart.length > 0"
              slot="badge"
            >{{ customerData.cart.length }}</span>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">{{ $t('landingPage.cart') }}</v-list-tile-title>
            </v-list-tile-content>
          </v-badge>
        </v-list-tile>
        <v-list-tile
          v-if="!isLoggedIn"
          :to="{name:`signin___${$i18n.locale}`}"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.signIn') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="!isLoggedIn"
          :to="{name:`signup___${$i18n.locale}`}"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.signUp') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isLoggedIn"
          :to="{name:`user-profile___${$i18n.locale}`}"
          exact
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.profile') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isLoggedIn"
          @click="showChangePass = true"
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.changePass') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isLoggedIn"
          @click="logout"
        >
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ $t('landingPage.signOut') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
          :value="false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ localeLang }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, i) in filteredLangList"
            :key="i"
            :to="switchLocalePath(item.value)"
            @click="onChangeLang(item.value)"
          >
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :color="navColor"
      :class="toolbarClass()"
      :scroll-threshold="30"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      dark
      fixed
    >
      <v-toolbar-side-icon
        :class="fontClass()"
        class="hidden-md-and-up"
        @click="sideBarModel = !sideBarModel"
      />
      <v-toolbar-items class="hidden-sm-and-down ml-0 pl-3 align-center">
        <v-btn
          :class="fontClass()"
          flat
          large
          class="headline font-enforce font-weight-black"
          @click="toHome"
        >
          96 TRAVEL
        </v-btn>
      </v-toolbar-items>

      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu offset-y>
          <v-btn
            slot="activator"
            :class="fontClass()"
            flat
            class="font-enforce font-weight-black"
          >
            <!-- <span class="flag-icon" :class="[`flag-icon-${lang.code}`]"></span> -->
            {{ localeLang }}
          </v-btn>

          <v-list>
            <v-list-tile
              v-for="(item, i) in filteredLangList"
              :key="i"
              :to="switchLocalePath(item.value)"
              @click="onChangeLang(item.value)"
            >
              <v-list-tile-title>
                <!-- <span class="flag-icon flag-icon-background" :class="[`flag-icon-${item.code}`]"></span> -->
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- <v-menu offset-y>
          <v-btn
            slot="activator"
            :class="fontClass()"
            flat
            class="font-enforce font-weight-black"
          >
            {{ lang.code }}
          </v-btn>

          <v-list>
            <v-list-tile
              v-for="(item, i) in filteredLangList"
              :key="i"
              :to="switchLocalePath(item.code)"
            >
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu> -->
        <!-- <nuxt-link
          v-for="locale in $i18n.locales"
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link> -->
        <v-btn
          :to="{name:`about___${$i18n.locale}`}"
          :class="fontClass()"
          nuxt
          flat
          exact
          class="font-enforce font-weight-black"
        >
          {{ $t('landingPage.aboutUs') }}
        </v-btn>
        <v-btn
          :class="fontClass()"
          :to="{name:`cart___${$i18n.locale}`}"
          flat
          class="font-enforce font-weight-black"
          exact
        >
          <v-badge
            right
            color="orange"
          >
            <span
              v-if="isLoggedIn && customerData.cart.length > 0"
              slot="badge"
            >{{ customerData.cart.length }}</span>
            {{ $t('landingPage.cart') }}
          </v-badge>
        </v-btn>
        <v-btn
          v-if="!isLoggedIn"
          :class="fontClass()"
          :to="{name:`signin___${$i18n.locale}`}"
          flat
          exact
          class="font-enforce font-weight-black"
        >
          {{ $t('landingPage.signIn') }}
        </v-btn>
        <v-btn
          v-if="!isLoggedIn"
          :class="fontClass()"
          :to="{name:`signup___${$i18n.locale}`}"
          flat
          exact
          class="font-enforce font-weight-black"
        >
          {{ $t('landingPage.signUp') }}
        </v-btn>
        <v-menu
          v-if="isLoggedIn"
          v-model="userMenu"
          :value="false"
          :close-on-content-click="false"
          lazy
          transition="scale-transition"
          origin="top right"
          offset-y
        >
          <v-btn
            slot="activator"
            flat
            large
          >
            <v-avatar size="32px">
              <img
                :src="customerData.image_id | cloudinaryFaceGravityImageUrl | determineImgSrc"
                class="no-hover"
                alt="avatar"
              >
            </v-avatar>
          </v-btn>
          <v-card>
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img
                    :src="customerData.image_id | cloudinaryFaceGravityImageUrl | determineImgSrc"
                    alt="avatar"
                  >
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ customerData.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ customerData.email }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider />

            <v-list>
              <v-list-tile @click="userProfileClick">
                <v-list-tile-content>{{ $t('landingPage.profile') }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click="showChangePass = true">
                <v-list-tile-content>{{ $t('landingPage.changePass') }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :loading="loggingOut"
                color="light-blue accent-2"
                flat
                @click="logout"
              >{{ $t('landingPage.signOut') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <!-- <v-btn flat class="no-hover" v-if="userId">
                <v-avatar size="32px" class="no-hover">
                    <img
                        class="no-hover"
                        :src="customerData.image_id | cloudinaryImageUrl"
                        alt="avatar"
                    >
                </v-avatar>
            </v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <!-- <v-progress-linear
      v-if="isFullPageLoading"
      :indeterminate="true"
      class="rainbow-gradient progress-bar-top ma-0 px-0 fluid"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import ChangePasswordDialog from "~/components/Dialog/ChangePasswordDialog.vue"
import _ from "lodash"

export default {
  components: {
    ChangePasswordDialog
  },
  props: {
    navColor: {
      type: String,
      default: ""
    }

  },
  data () {
    return {
      sideBarModel: false,
      loggingOut: false,
      offsetTop: 0,
      userMenu: false,
      lang: { value: "en", code: "English" },
      langList: [
        {
          id: 0, value: "en", name: "English", code: "en"
        },
        {
          id: 1, value: "zh", name: "中文", code: "zh"
        }
      ],
      showChangePass: false
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.loggedIn,
      customer: state => state.auth.user,
      localeLang: state => state.localeLang
    }),
    filteredLangList () {
      return this.langList.filter(langObj => langObj.value !== this.localeLang)
    },
    customerData () {
      return { ...this.customer, ...{ cart: [] } }
    }
  },
  watch: {
    // call again the method if the route changes
    $route: (val) => {
      // console.log('route change', val);
    }
  },
  mounted () {
    this.debouncedAction = _.debounce(this.updateUser, 2000)
    if (this.customerData) {
      if (typeof this.customerData.localeLang !== "undefined") {
        this.setLang(this.customerData.localeLang)
      }
    }
  },
  methods: {
    ...mapActions([
      "setLocaleLang"
    ]),
    checkPathForFont () {
      return (
        this.$route.path !== "/" &&
        this.$route.path !== "/signin" &&
        this.$route.path !== "/signup" &&
        this.$route.path !== "/forgot-password" &&
        this.$route.path !== "/resend-verification" &&
        this.$route.path.indexOf("reset-password") === -1
      )
    },
    // checkPathForTransparent () {
    //   return (
    //     this.$route.path === "/" ||
    //     this.$route.path === "/signin" ||
    //     this.$route.path === "/signup" ||
    //     this.$route.path === "/forgot-password" ||
    //     this.$route.path === "/resend-verification" ||
    //     this.$route.path.indexOf("reset-password") !== -1
    //   )
    // },
    fontClass () {
      let fontClass = "primary--text"
      if (this.checkPathForFont() || this.offsetTop > 10) {
        fontClass = ""
      }
      return fontClass
    },
    // isTransparentColor () {
    //   let color = ""
    //   // need give more offset to not have color fade, instant color change
    //   if (this.checkPathForTransparent() && this.offsetTop < 300) {
    //     color = "transparent"
    //   }

    //   return color
    // },
    logout () {
      this.loggingOut = true
      this.$auth.logout()
        .then(() => {
          this.userMenu = false
          this.loggingOut = false
          this.$store.dispatch("setupSnackbar", {
            show: true,
            text: "Goodbye, have a nice day!",
            type: "success"
          })
        })
        .catch()
      // this.setFullPageLoading(true);
      // Meteor.logout((err) => {
      //   this.setFullPageLoading(false);
      //   this.userMenu = false;
      //   this.loggingOut = false;
      //   if (!err) {
      //     this.$router.push({ name: "Home" });
      //   }
      //   this.setupSnackbar({
      //     show: true,
      //     text: "Goodbye, have a nice day!",
      //     type: "success",
      //   });
      // });
    },
    onChangeLang (langValue) {
      // this.$store.dispatch('', langValue)
      this.setLang(langValue)
      this.debouncedAction()
      // if (this.userId) {
      //   Meteor.call("customerUpdate", { localeLang: this.lang.value });
      // }
    },
    onScroll () {
      this.userMenu = false
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    setLang (langValue) {
      // this.lang = {
      //   value: langValue,
      //   code: this.getLocaleLangCode(langValue)
      // }
      // this.setLocaleLang(this.lang);
      this.setLocaleLang(langValue)
      this.$store.commit("i18n/I18N_SET_LOCALE", langValue)
    },
    toHome () {
      this.$router.push({ name: `index___${this.$i18n.locale}` })
    },
    toolbarClass () {
      let toolbarClass = "elevation-0"
      if (this.checkPathForFont() || this.offsetTop > 10) {
        toolbarClass = "blue-gradient"
      }

      return toolbarClass
    },
    async updateUser () {
      if (this.customer) {
        let formData = new FormData()
        formData.append("localeLang", this.localeLang)
        await this.$axios.$put(`/api/customers/${this.customer._id}`, formData)
        await this.$auth.fetchUser()
      }
    },
    userProfileClick () {
      this.userMenu = false
      this.$router.push({ name: `user-profile___${this.$i18n.locale}` })
    }
  },
  i18n: {
    messages: {
      en: {
        landingPage: {
          aboutUs: "About Us",
          cart: "Cart",
          changePass: "Change Password",
          home: "Home",
          profile: "Profile",
          signIn: "Sign In",
          signOut: "Logout",
          signUp: "Sign Up"
        }
      },
      zh: {
        landingPage: {
          aboutUs: "关于",
          cart: "购物车",
          changePass: "更换密码",
          home: "首页",
          profile: "个人资料",
          signIn: "登录",
          signOut: "登出",
          signUp: "注册"
        }
      }
    }
  }
  // meteor: {
  //   $subscribe: {
  //     getCustomerTransactions: [],
  //   },
  //   userId () {
  //     return Meteor.userId();
  //   },
  //   customerData() {
  //     const cust = Customers.findOne({ user_id: Meteor.userId() }) || this.getSchemaObjAndSetDefaultEmptyObj(Customers);
  //     return cust;
  //   },
  // },
}
</script>

<style>
.no-hover:hover {
    box-shadow:none !important;
}

.blue-gradient {
  background: linear-gradient(to left, #2a9afc 0%, #00cbfe 100%);
}

.progress-bar-top{
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
}

.rainbow-gradient {
    /* https://stackoverflow.com/questions/40557461/rainbow-gradient-on-text-in-css */
    height: 200px;
    background: -moz-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* ff3.6+ */
    background: -webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(255,0,0,1)), color-stop(25%, rgba(255,255,0,1)), color-stop(50%, rgba(5,193,255,1)), color-stop(75%, rgba(255,255,0,1)), color-stop(100%, rgba(255,0,0,1))); /* safari4+,chrome */
    background: -webkit-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* safari5.1+,chrome10+ */
    background: -o-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* opera 11.10+ */
    background: -ms-linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* ie10+ */
    background: linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,255,0,1) 25%, rgba(5,193,255,1) 50%, rgba(255,255,0,1) 75%, rgba(255,0,0,1) 100%); /* w3c */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#ff0000',GradientType=1 ); /* ie6-9 */
}

.flag-icon{
    font-size: 25px !important;
}
</style>
