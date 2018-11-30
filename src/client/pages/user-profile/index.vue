<template>
  <div>
    <v-container
      fluid
      fill-height
      py-0
      px-0>
      <v-layout
        row
        wrap>
        <v-flex xs12>
          <v-card>
            <v-img
              src="~assets/img/profile-bg.jpg"
              height="300px"
            >
              <v-layout
                fill-height
                justify-center
                align-center
                row
                wrap
                white--text
              >
                <input
                  ref="avatar"
                  :accept="acceptedMediaType"
                  type="file"
                  class="cantseeme"
                  name="avatarUpload"
                  @change="filesChange($event.target.name, $event.target.files)"
                >
                <v-tooltip
                  color="white"
                  top>
                  <v-btn
                    slot="activator"
                    icon
                    large
                    @click="avatarClick()">
                    <v-avatar size="132px">
                      <img
                        :src="customerData.image_id | cloudinaryFaceGravityImageUrl | determineImgSrc"
                        alt="avatar">
                    </v-avatar>
                  </v-btn>
                  <span class="black--text">Upload profile picture</span>
                </v-tooltip>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container
      fluid
      py-0
      px-0 >
      <v-layout
        justify-center
        align-center
        class="text-xs-justify"
        py-0 >
        <v-flex
          lg8
          md12 >
          <v-tabs
            grow
            color="transparent"
            class="elevation-10"
          >
            <v-tabs-slider color="primary"/>
            <v-tab
              href="#profile"
              class="font-weight-bold" >Profile</v-tab>
            <!-- <v-divider class=" primary" vertical></v-divider> -->
            <v-tab
              href="#history"
              class="font-weight-bold">Purchase History</v-tab>
            <v-tab-item
              id="profile"
            >
              <v-form @submit.prevent="profileSubmit" >
                <v-card
                  flat
                  class="v-form"
                  color="">
                  <v-container>
                    <v-layout
                      row
                      wrap>
                      <v-flex xs12 >
                        <v-text-field
                          v-model.trim="userData.name"
                          :error-messages="checkError('name', validationProps.userData, $v.userData)"
                          name="name"
                          label="Name"
                          type="text"
                          @input="$v.userData.name.$touch()"/>
                        <v-text-field
                          v-model.trim="userData.email"
                          disabled
                          name="email"
                          label="Email"
                          type="text"/>
                        <v-text-field
                          v-model.trim="userData.wechat_id"
                          :error-messages="checkError('wechat_id', validationProps.userData, $v.userData)"
                          name="wechat_id"
                          label="Wechat ID"
                          type="text"
                          @input="$v.userData.wechat_id.$touch()"/>
                        <v-text-field
                          v-model.trim="userData.contact_number"
                          :error-messages="checkError('contact_number', validationProps.userData, $v.userData, 'Contact Number')"
                          name="contact_number"
                          label="Contact Number"
                          type="number"
                          @input="$v.userData.contact_number.$touch()"/>
                        <v-btn
                          :loading="submitting"
                          block
                          large
                          type="submit"
                          color="primary">Save Changes</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-form>
            </v-tab-item>
            <v-tab-item
              id="history"
            >
              <purchase-history :transaction-prop="transactionData"/>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

// import { Customers } from "/imports/collections/customers"
import { mapState } from "vuex"

import PurchaseHistory from "~/components/PurchaseHistory.vue"
import { required } from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
// import { Transactions } from "/imports/collections/transactions"

import _ from "lodash"
export default {
  components: {
    PurchaseHistory
  },
  mixins: [ validationMixin ],
  data () {
    let defaultData = {
      acceptedMediaType: "image/*",
      avatarFile: null,
      submitting: false,
      tab: ["profile", "history"],
      userData: {},
      validationProps: {
        userData: {
          contact_number: { required },
          name: { required },
          wechat_id: {}
        }
      }

    }
    return defaultData
  },
  computed: {
    ...mapState({
      customerData: state => state.auth.user
    })

  },
  methods: {
    // ...mapActions("layout", [
    //   "setupSnackbar",
    //   "setLoading"
    // ]),
    avatarClick () {
      this.$refs.avatar.click()
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      if (!fileList.length) return

      this.avatarFile = fileList[0]
      let reader = new FileReader()
      reader.onload = (e) => {
        this.$el.querySelector("img").setAttribute("src", e.target.result)
      }

      reader.readAsDataURL(fileList[0])
    },
    profileSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let uploadPromiseArr = []
        this.submitting = true
        this.setLoading(true)
        new Promise((resolve, reject) => {
          if (this.avatarFile) {
            this.uploadFile(this.avatarFile, (res) => {
              resolve(res)
            })
          }
          else {
            resolve()
          }
        })
          .then((avatarId) => {
            let imageToBeRemoved
            if (this.userData.image_id && this.avatarFile) {
              imageToBeRemoved = _.clone(this.userData.image_id)
              this.userData.image_id = avatarId
            }

            let msg = "Profile updated"
            let type = "success"
            // Meteor.call("customerUpdate", this.userData, (err, res) => {
            //   this.submitting = false
            //   this.setLoading(false)
            //   this.setupSnackbar({
            //     show: true,
            //     text: msg,
            //     type: type
            //   })
            //   if (err) {
            //     msg = "We are unable to update your profile at the moment"
            //     type = "error"
            //   }
            // })
            if (imageToBeRemoved) {
              // Meteor.call("removeCloudinaryResources", "image", imageToBeRemoved)
            }
          })
          .catch((err) => {
            this.submitting = false
            // this.setLoading(false)
            // this.setupSnackbar({
            //   show: true,
            //   text: "We are unable to update your profile at the moment",
            //   type: "error"
            // })
          })
      }
    }
  },
  // meteor: {
  //   customerData () {
  //     let cust = Customers.findOne({ user_id: Meteor.userId() })
  //     this.$data.userData = { ...cust }
  //     return cust
  //   },
  //   transactionData () {
  //     let trans = Transactions.find({ customer_id: Meteor.userId() }, { sort: { updated_at: -1 } })
  //     let transactions = []
  //     trans.forEach((_trans) => {
  //       let transAttr = _.clone(_trans)

  //       // let transItems = TransactionItems.find({transaction_id: transAttr._id});
  //       // let transItemArr = [];
  //       // transItems.forEach(function(_item){
  //       //     _item.addOnPurchases = AddOnPurchases.find({transaction_item_id: _item._id});
  //       //     let transItemsAttr =  _.clone(_item);
  //       //     let prod = Products.findOne({_id: transItemsAttr.product_id});
  //       //     prod = _.omit(prod, [
  //       //         'itinerary', 'other_image_ids', 'highlights', 'description', '_id',
  //       //         'tour_guide', 'travel_insurance_file_id', 'notes', 'includes', 'cost'
  //       //     ]);

  //       //     if(prod){
  //       //         transItemsAttr = _.extend(transItemsAttr, prod);
  //       //     }

  //       //     transItemArr.push(transItemsAttr);
  //       // });
  //       // transAttr.items = transItemArr;
  //       // this.$subscribe('getCustomerTransactionItems', () => [transAttr._id]);
  //       transactions.push(transAttr)
  //     })
  //     // console.log('transactions', transactions.length,  new Date().getTime() - this.time, transactions);

  //     return transactions
  //   }
  // },
  validations () {
    return this.validationProps
  }
}
</script>

<style>

</style>
