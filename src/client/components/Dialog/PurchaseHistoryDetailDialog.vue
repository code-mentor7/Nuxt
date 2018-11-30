<template>
  <v-dialog
    v-model="isShow"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="close()">
    <v-card >
      <v-card-title
        class="headline font-weight-thin blue-gradient white--text font-enforce"
        primary-title
      >
        <v-spacer/>
        Purchase History
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-title
        class="headline font-weight-black font-enforce grey lighten-2"
        primary-title
      >
        Order #{{ purchaseHistory._id }}
        <v-subheader>Placed on {{ purchaseHistory.created_at | formatDate }}</v-subheader>
        <v-spacer/>
        <span class=" headline green--text font-weight-thin font-enforce"> MYR{{ purchaseHistory.total_amount }}</span>
      </v-card-title>
      <v-progress-linear
        v-show="subLoading"
        :indeterminate="true"
        class="rainbow-gradient progress-bar-top ma-0 px-0 fluid"/>
      <v-container
        :px-0="$vuetify.breakpoint.smAndDown"
        :py-0="$vuetify.breakpoint.smAndDown"
        fluid>
        <template v-for="(transItem, index) in transactionItem" >
          <v-layout
            :key="index"
            row
            wrap
            class="py-1 hidden-sm-and-down" >
            <v-flex
              xs2
              class="py-0" >
              <v-img
                :src=" transItem.primary_image_id | cloudinaryImageUrl | determineImgSrc"
                height="200px"/>
            </v-flex>
            <v-flex xs10>
              <v-card-title
                primary-title
                class="pt-3 pb-0">
                <a
                  :href="`/tour/${transItem.slug}`"
                  class="headline primary--text font-weight-thin font-enforce ellipsis">
                  {{ transItem.product_name }}
                </a>
                <v-subheader>
                  <span v-if="transItem.is_refunded">
                    <v-chip
                      outline
                      small
                      color="orange" >
                      <span class="font-weight-black">Refunded</span>
                    </v-chip>
                  </span>
                  <span v-else-if="transItem.is_cancelled">
                    <v-chip
                      outline
                      small
                      color="orange" >
                      <span class="font-weight-black">Cancelled</span>
                    </v-chip>
                  </span>
                  <span v-else-if="transItem.is_completed">
                    <v-chip
                      outline
                      small
                      color="green" >
                      <span class="font-weight-black">Completed</span>
                    </v-chip>
                  </span>
                  <span v-else-if="transItem.is_paid">
                    <v-chip
                      outline
                      small
                      color="green" >
                      <span class="font-weight-black">Paid</span>
                    </v-chip>
                  </span>
                  <span v-else-if="transItem.is_pending">
                    <v-chip
                      outline
                      small
                      color="grey" >
                      <span class="font-weight-black">Pending</span>
                    </v-chip>
                  </span>
                </v-subheader>
                <v-spacer/>
                <span
                  v-if="transItem.adult_quantity > 0"
                  class="font-weight-bold"> {{ transItem.adult_quantity }} Adult &nbsp;</span>
                <span
                  v-if="transItem.child_quantity > 0"
                  class="font-weight-bold">{{ transItem.child_quantity }} Child</span>
              </v-card-title>
              <v-card-text class="pt-1 pb-1 ">
                <span class=" title font-weight-thin font-enforce green--text">MYR{{ transItem.total_price }}</span>&nbsp;
              </v-card-text>
              <v-card-text class="py-0 ">
                <v-chip
                  v-if="transItem.is_insurance"
                  color="orange darken-4"
                  text-color="white">
                  Travel Insurance
                </v-chip>
                <v-chip
                  v-if="transItem.is_tour_guide"
                  color="orange darken-4"
                  text-color="white">

                  {{ transItem.tour_guide_name }}
                </v-chip>
              </v-card-text>
              <v-card-text class="py-1 font-weight-bold">
                Travelling from {{ transItem.travel_start_date | formatDateOnly }} to {{ transItem.travel_end_date | formatDateOnly }}
              </v-card-text>
              <v-card-title
                v-if="!checkIsExpired(transItem.tour_addons_expiration_date)"
                class="py-1 font-weight-bold">
                <v-btn
                  class="primary"
                  @click="clickAddOnPurchase(transItem.product_id, transItem._id)">Buy more!</v-btn>
                <v-subheader>
                  Addon available until {{ transItem.tour_addons_expiration_date | formatDateOnly }}
                </v-subheader>
              </v-card-title>
            </v-flex>
          </v-layout>
          <div
            :key="`${index}mobile`"
            class="hidden-md-and-up">
            <v-img
              :src=" transItem.primary_image_id | cloudinaryImageUrl | determineImgSrc"
              height="100px"/>
            <v-card-title
              primary-title
              class="pt-3 pb-0">
              <a
                :href="`/tour/${transItem.slug}`"
                class="headline primary--text font-weight-thin font-enforce ellipsis">
                {{ transItem.product_name }}
              </a>
              <v-spacer/>
              <span class=" title font-weight-thin font-enforce green--text">MYR{{ transItem.total_price }}</span>&nbsp;
            </v-card-title>
            <v-card-title class="py-0 font-weight-bold">
              <span v-if="transItem.adult_quantity > 0"> {{ transItem.adult_quantity }} Adult &nbsp;</span>
              <span v-if="transItem.child_quantity > 0">{{ transItem.child_quantity }} Child</span>
              <v-spacer/>
              <span v-if="transItem.is_refunded">
                <v-chip
                  outline
                  small
                  color="orange" >
                  <span class="font-weight-black">Refunded</span>
                </v-chip>
              </span>
              <span v-else-if="transItem.is_cancelled">
                <v-chip
                  small
                  outline
                  color="orange" >
                  <span class="font-weight-black">Cancelled</span>
                </v-chip>
              </span>
              <span v-else-if="transItem.is_completed">
                <v-chip
                  small
                  outline
                  color="green" >
                  <span class="font-weight-black">Completed</span>
                </v-chip>
              </span>
              <span v-else-if="transItem.is_paid">
                <v-chip
                  small
                  outline
                  color="green" >
                  <span class="font-weight-black">Paid</span>
                </v-chip>
              </span>
              <span v-else-if="transItem.is_pending">
                <v-chip
                  small
                  outline
                  color="grey" >
                  <span class="font-weight-black">Pending</span>
                </v-chip>
              </span>
            </v-card-title>
            <v-card-text class="py-0">
              <v-chip
                v-if="transItem.is_insurance"
                small
                color="orange darken-4"
                text-color="white">
                Travel Insurance
              </v-chip>
              <v-chip
                v-if="transItem.is_tour_guide"
                small
                color="orange darken-4"
                text-color="white">

                {{ transItem.tour_guide_name }}
              </v-chip>
            </v-card-text>
            <v-card-text class="pt-0 pb-2 font-weight-bold">
              <div>Travelling from {{ transItem.travel_start_date | formatDateOnly }} to {{ transItem.travel_end_date | formatDateOnly }}</div>
            </v-card-text>
            <span v-if="!checkIsExpired(transItem.tour_addons_expiration_date)">
              <v-btn
                class="primary"
                @click="clickAddOnPurchase(transItem.product_id, transItem._id)">Buy more!</v-btn>
              <v-subheader>Addon available until {{ transItem.tour_addons_expiration_date | formatDateOnly }}</v-subheader>
            </span>
          </div>
          <!-- <v-layout class="pb-3" :key="`${index}dividerasd`">
                        <v-flex xs12  v-for="(addonItem, i) in transItem.addOnPurchases" :key="i">
                            heyyy Order #{{addonItem}}
                        </v-flex>
                    </v-layout> -->
          <v-expansion-panel
            v-if="transItem.addOnPurchases && transItem.addOnPurchases.length > 0"
            :key="`${index}addon`"
            class="elevation-5">
            <v-expansion-panel-content ripple >
              <div
                slot="header"
                class="font-weight-bold font-enforce">
                <v-badge right>
                  <span slot="badge">{{ transItem.addOnPurchases.length }}</span>
                  Addon Purchases
                </v-badge>
              </div>
              <v-card
                v-for="(addonItem, i) in transItem.addOnPurchases"
                :key="i">
                <v-card-title
                  primary-title
                  class="pt-3 pb-0 headline font-weight-thin font-enforce">

                  Order<span class="primary--text">&nbsp;#{{ addonItem._id }}</span>
                  <v-subheader>
                    <span v-if="addonItem.is_refunded">
                      <v-chip
                        outline
                        small
                        color="orange" >
                        <span class="font-weight-black">Refunded</span>
                      </v-chip>
                    </span>
                    <span v-else-if="addonItem.is_cancelled">
                      <v-chip
                        small
                        outline
                        color="orange" >
                        <span class="font-weight-black">Cancelled</span>
                      </v-chip>
                    </span>
                    <span v-else-if="addonItem.is_completed">
                      <v-chip
                        small
                        outline
                        color="green" >
                        <span class="font-weight-black">Completed</span>
                      </v-chip>
                    </span>
                    <span v-else-if="addonItem.is_paid">
                      <v-chip
                        small
                        outline
                        color="green" >
                        <span class="font-weight-black">Paid</span>
                      </v-chip>
                    </span>
                    <span v-else-if="addonItem.is_pending">
                      <v-chip
                        small
                        outline
                        color="grey" >
                        <span class="font-weight-black">Pending</span>
                      </v-chip>
                    </span>
                  </v-subheader>
                  <v-spacer/>
                  <span class="green--text">MYR{{ addonItem.total_price }}</span>
                </v-card-title>
                <v-card-text class="py-0 font-weight-thin">
                  <span v-if="addonItem.adult_quantity > 0"> {{ addonItem.adult_quantity }} Adult &nbsp;</span>
                  <span v-if="addonItem.child_quantity > 0">{{ addonItem.child_quantity }} Child</span>
                </v-card-text>
                <v-card-text class="py-0 ">
                  <v-chip
                    v-if="addonItem.is_insurance"
                    small
                    color="orange darken-4"
                    text-color="white">
                    Travel Insurance
                  </v-chip>
                  <v-chip
                    v-if="addonItem.is_tour_guide"
                    small
                    color="orange darken-4"
                    text-color="white">

                    {{ addonItem.tour_guide_name }}
                  </v-chip>
                </v-card-text>
                <v-card-text class="py-0 font-weight-thin">
                  Placed on {{ addonItem.created_at | formatDate }}
                </v-card-text>

                <v-divider
                  v-if="i + 1 < transItem.addOnPurchases.length"
                  class="grey lighten-2"
                />
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-layout
            :key="`${index}divider`"
            class="pb-3">
            <v-divider
              v-if="index + 1 < transactionItem.length"
              class="grey lighten-2"
            />
          </v-layout>
        </template>
      </v-container>
      <!-- </v-card> -->
    </v-card>
    <add-on-purchase-dialog
      :show="showAddOnPurchaseDialog"
      :product="clickedProduct"
      :trans-item="clickedTransItem"
      @close="showAddOnPurchaseDialog = false"
    />
  </v-dialog>
</template>

<script>
import _ from "lodash"
import AddOnPurchaseDialog from "~/components/Dialog/AddOnPurchaseDialog.vue"
// import { AddOnPurchases } from "/imports/collections/addOnPurchases"
// import { Products } from "/imports/collections/products"
// import { TransactionItems } from "/imports/collections/transactionItems"

export default {
  components: {
    AddOnPurchaseDialog
  },
  props: {
    show: { type: Boolean },
    purchaseHistory: { type: Object, required: true },
    subLoading: { type: Boolean }
  },
  data () {
    return {
      isLoading: true,
      showAddOnPurchaseDialog: false,
      clickedProduct: "",
      clickedTransItem: ""
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
    clickAddOnPurchase (productId, transItemId) {
      this.clickedProduct = productId
      this.clickedTransItem = transItemId
      this.showAddOnPurchaseDialog = true
    },
    close () {
      this.$emit("close")
    },
    checkIsExpired (givenExpirationDate, name) {
      let currentDate = new Date()
      let expirationDate = new Date()
      let isExpired = false
      if (givenExpirationDate) {
        expirationDate = new Date(givenExpirationDate)
        isExpired = currentDate > expirationDate
      }
      return isExpired
    }
  }
  // meteor: {
  //   transactionItem () {
  //     let transItems = TransactionItems.find({ transaction_id: this.purchaseHistory._id })
  //     let transItemArr = []
  //     transItems.forEach(function (_item) {
  //       _item.addOnPurchases = AddOnPurchases.find({ transaction_item_id: _item._id }).fetch()
  //       let transItemsAttr = _.clone(_item)
  //       let prod = Products.findOne({ _id: transItemsAttr.product_id })
  //       prod = _.omit(prod, [
  //         "itinerary", "other_image_ids", "highlights", "description", "_id",
  //         "tour_guide", "travel_insurance_file_id", "notes", "includes", "cost"
  //       ])

  //       if (prod) {
  //         transItemsAttr = _.extend(transItemsAttr, prod)
  //       }

  //       transItemArr.push(transItemsAttr)
  //     })
  //     return transItemArr
  //   }

  // }
}
</script>

<style>

</style>
