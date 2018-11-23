<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    v-model="isShow"
    scrollable
    @keydown.esc="close()">
    <v-card dark>
      <v-card-title
        class="headline font-weight-thin primary white--text font-enforce"
        primary-title
      >
        <v-spacer/>
        Terms of Service &amp; Privacy Policy
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex
              xs12
              class="font-enforce subheading font-weight-thin text-xs-justify">
              <ol>
                <li> Terms
                  <ol>
                    <li>
                      By accessing the website at https://www.96travel.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                    </li>
                  </ol>
                </li>
                <li> Use License
                  <ol>
                    <li>
                      This license shall automatically terminate if you violate any of these restrictions and may be terminated by Come Travel Sdn Bhd at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format
                    </li>
                    <li>
                      Permission is granted to temporarily download one copy of the materials (information or software) on Come Travel Sdn Bhd’s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                      <ol>
                        <li>
                          Modify or copy the materials
                        </li>
                        <li>
                          Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).
                        </li>
                        <li>
                          Attempt to decompile or reverse engineer any software contained on Come Travel Sdn Bhd’s website.
                        </li>
                        <li>
                          Remove any copyright or other proprietary notations from the materials.
                        </li>
                        <li>
                          Transfer the materials to another person or "mirror" the materials on any other server.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li>
                  Disclaimer
                  <ol>
                    <li>
                      The materials on Come Travel Sdn Bhd’s website are provided on an 'as is' basis. Come Travel Sdn Bhd makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </li>
                    <li>
                      Further, Come Travel Sdn Bhd’s does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                    </li>
                  </ol>
                </li>
                <li>
                  Limitations
                  <ol>
                    <li>
                      In no event shall Come Travel Sdn Bhd or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Come Travel Sdn Bhd’s website, even if Come Travel Sdn Bhd or a Come Travel Sdn Bhd authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                    </li>
                  </ol>
                </li>
                <li>
                  Accuracy of materials
                  <ol>
                    <li>
                      The materials appearing on Come Travel Sdn Bhd’s website could include technical, typographical, or photographic errors. Come Travel Sdn Bhd does not warrant that any of the materials on its website are accurate, complete or current. Come Travel Sdn Bhd may make changes to the materials contained on its website at any time without notice. However Come Travel Sdn Bhd does not make any commitment to update the materials.
                    </li>
                  </ol>
                </li>
                <li>
                  Links
                  <ol>
                    <li>
                      Come Travel Sdn Bhd has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Come Travel Sdn Bhd of the site. Use of any such linked website is at the user's own risk.
                    </li>
                  </ol>
                </li>
                <li>Modifications
                  <ol>
                    <li>
                      Come Travel Sdn Bhd may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                    </li>
                  </ol>
                </li>
                <li>
                  Governing Law
                  <ol>
                    <li>
                      These terms and conditions are governed by and construed in accordance with the laws of Kuala Lumpur, Malaysia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                    </li>
                  </ol>
                </li>
                <li>
                  Privacy Policy
                  <ol>
                    <li>
                      Your privacy is important to us.
                      It is Come Travel Sdn Bhd's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.
                      <ol>
                        <li>
                          We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
                        </li>
                        <li>
                          Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
                        </li>
                        <li>
                          We will collect and use personal information solely for fulfilling those purposes specified by us and for other ancillary purposes, unless we obtain the consent of the individual concerned or as required by law.
                        </li>
                        <li>
                          Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
                        </li>
                        <li>
                          We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
                        </li>
                        <li>
                          We will make readily available to customers information about our policies and practices relating to the management of personal information.
                        </li>
                        <li>
                          We will only retain personal information for as long as necessary for the fulfilment of those purposes.
                        </li>
                        <li>
                          We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Come Travel Sdn Bhd may change this privacy policy from time to time at Come Travel Sdn Bhd's sole discretion.
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat
          @click.native="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    isShow: {
      // https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.close()
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit("close")
    }
  }
}
</script>
</script>

<style scoped>
/* https://stackoverflow.com/questions/10405945/html-ordered-list-1-1-1-2-nested-counters-and-scope-not-working */
ol {
  counter-reset: item
}
li {
  display: block
}
li:before {
  content: counters(item, ".") " ";
  counter-increment: item;
  color: #6dffff;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
</style>
