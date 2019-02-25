<template>
  <v-footer
    height="auto"
    color="blue"
  >
    <v-container
      fluid
      fill-height
      py-0
      px-0>
      <v-layout
        justify-center
        row
        wrap
        white--text
      >
        <v-flex
          pa-5
          xs12
          sm4
          class="text-xs-center">
          <h5 class="title pb-3 font-enforce font-weight-thin"> {{ siteIdentity.company_name }}</h5>
          <address>
            {{ siteIdentity.address_line_1 }} {{ siteIdentity.address_line_2 }}, <br>
            {{ siteIdentity.city }}, {{ siteIdentity.state }},
            {{ siteIdentity.zip_code }}, {{ siteIdentity.country }}
          </address>
          <h3
            href
            class="pt-3 font-enforce font-weight-thin"
            @click="showPnp = true">
            <a
              href="javascript:void(0);"
              class="white--text">Terms &amp; Privacy Policy</a>
          </h3>
          <h3
            href
            class="pt-3 font-enforce font-weight-thin"
            @click="showRefundPolicy = true">
            <a
              href="javascript:void(0);"
              class="white--text">Refund Terms</a>
          </h3>
        </v-flex>
        <v-flex
          pa-5
          xs12
          sm4 >
          <h5 class="title pb-3 font-enforce font-weight-thin"> Stay Connected</h5>
          <v-list
            :three-line="siteIdentity.phone_number.length == 3"
            style="background: transparent;"
            dense>
            <v-list-tile color="white" >
              <v-list-tile-action>
                <v-icon color="black">phone</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title
                  v-for="(value, i) in siteIdentity.phone_number"
                  v-if="value.data"
                  :key="i"
                  class="subheading font-enforce">
                  {{ value.data }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list
            :three-line="siteIdentity.emails.length == 3"
            style="background: transparent;"
            dense>
            <v-list-tile color="white" >
              <v-list-tile-action>
                <v-icon color="black">mail</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title
                  v-for="(value, i) in siteIdentity.emails"
                  v-if="value.data"
                  :key="i"
                  class="subheading font-enforce">
                  {{ value.data }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list
            :three-line="siteIdentity.whatsapp.length == 3"
            style="background: transparent;"
            dense>
            <v-list-tile color="white" >
              <v-tooltip top>
                <span>Whatsapp</span>
                <v-list-tile-action slot="activator">
                  <v-icon color="black">fa fa-whatsapp</v-icon>
                </v-list-tile-action>
              </v-tooltip>

              <v-list-tile-content>
                <v-list-tile-title
                  v-for="(value, i) in siteIdentity.whatsapp"
                  v-if="value.data"
                  :key="i"
                  class="subheading font-enforce">
                  {{ value.data }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list
            :three-line="siteIdentity.wechat.length == 3"
            style="background: transparent;"
            dense>
            <v-list-tile color="white" >
              <v-tooltip top>
                <span>Wechat</span>
                <v-list-tile-action slot="activator">
                  <v-icon color="black">fa fa-wechat</v-icon>
                </v-list-tile-action>
              </v-tooltip>
              <v-list-tile-content>
                <v-list-tile-title
                  v-for="(value, i) in siteIdentity.wechat"
                  v-if="value.data"
                  :key="i"
                  class="subheading font-enforce">
                  {{ value.data }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list
            style="background: transparent;"
            dense>
            <v-list-tile
              :href="siteIdentity.fb_url"
              color="white">
              <v-tooltip top>
                <span>Facebook</span>
                <v-list-tile-action slot="activator">
                  <v-icon color="black">fa fa-facebook</v-icon>
                </v-list-tile-action>
              </v-tooltip>
            </v-list-tile>
          </v-list>
        </v-flex>
        <v-flex
          pa-5
          xs12
          sm4>
          <h5 class="title pb-3 font-enforce font-weight-thin"> Technical Support</h5>
          <v-list
            :three-line="siteIdentity.support_emails.length == 3"
            style="background: transparent;"
            dense>
            <v-list-tile color="white" >
              <v-list-tile-action >
                <v-icon color="black">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  v-for="(value, i) in siteIdentity.support_emails"
                  v-if="value.data"
                  :key="i"
                  class="subheading font-enforce">
                  {{ value.data }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <h5 class="title pb-3 font-enforce font-weight-thin"> Partners</h5>
          <img
            src="//sherpa.agoda.com/Badge/GetBadge?badgetype=1&refkey=v3EwiT1MjbQ%2FnMSObavRzQ%3D%3D"
            alt="">
          <br>
          <v-avatar
            tile
            size="120"
            color="grey lighten-4"
          >
            <img
              src="TRZ-Cruise-logo-Costa-1000x600.jpeg"
              alt="">
          </v-avatar>

        </v-flex>

        <v-flex xs12>
          <v-card
            flat
            tile
            class=" blue-grey darken-4 text-xs-center"
          >
            <v-card-text class="white--text">
              All Rights Reserved &copy; {{ footerYear }}
            </v-card-text>
          </v-card>
        </v-flex>
        <pnp-dialog
          :show="showPnp"
          @close="showPnp = false"/>
        <refund-policy-dialog
          :show="showRefundPolicy"
          @close="showRefundPolicy = false"/>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import { mapState } from "vuex"

import pnpDialog from "~/components/Dialog/PrivacyAndPolicyDialog.vue"
import refundPolicyDialog from "~/components/Dialog/RefundPolicyDialog.vue"
export default {
  components: {
    pnpDialog,
    refundPolicyDialog
  },
  data () {
    let now = new Date()
    let defaultData = {
      footerYear: now.getFullYear(),
      showPnp: false,
      showRefundPolicy: false
    }
    return defaultData
  },
  computed: {
    ...mapState({
      siteIdentity: state => state.api.siteIdentity
    })
  }
}
</script>

<style>

</style>
