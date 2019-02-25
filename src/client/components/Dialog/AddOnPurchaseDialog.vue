<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.mdAndDown"
    v-model="isShow"
    scrollable
    width="800"
    @keydown.esc="close()">
    <v-card
      v-if="localProduct"
      class="v-form">
      <v-card-title
        class="headline font-weight-thin primary white--text font-enforce"
        primary-title
      >
        <v-spacer/>
        Addon Purchase
        <v-spacer/>
        <v-btn
          class="white--text"
          icon
          @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-title
        class="subheading font-weight-black font-enforce grey lighten-2 pb-1 pt-0 px-0"
      >
        <v-expansion-panel>
          <v-expansion-panel-content ripple>
            <div slot="header" >You already bought</div>
            <v-container grid-list-xl >
              <v-layout
                row
                wrap >
                <v-flex
                  xs2
                  class="py-0 hidden-sm-and-down" >
                  <v-img
                    :src=" localProduct.primary_image_id | cloudinaryImageUrl | determineImgSrc"
                    height="100px"/>
                </v-flex>
                <v-flex xs10>
                  <v-card-title
                    primary-title
                    class="py-0">
                    <a
                      :href="`/tour/${localProduct.slug}`"
                      class="headline primary--text font-weight-thin font-enforce ellipsis">
                      {{ localProduct.name }}
                    </a>
                  </v-card-title>
                  <v-card-text class="py-0 ">
                    <span
                      v-if="totalOriginalData.totalBoughtAdultQty > 0"
                      class="font-weight-bold"> {{ totalOriginalData.totalBoughtAdultQty }} Adult &nbsp;</span>
                    <span
                      v-if="totalOriginalData.totalBoughtChildQty > 0"
                      class="font-weight-bold">{{ totalOriginalData.totalBoughtChildQty }} Child</span>
                  </v-card-text>
                  <v-card-text class="py-0 ">
                    <span class=" title font-weight-thin font-enforce green--text">MYR{{ totalOriginalData.totalBoughtPrice }}</span>&nbsp;
                  </v-card-text>
                  <v-card-text class="py-0 font-weight-bold">
                    Travelling from {{ localTransItem.travel_start_date | formatDateOnly }} to {{ localTransItem.travel_end_date | formatDateOnly }}
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-title>
      <v-card-text class="px-0 py-0">
        <div class="pb-4 pt-2 ">
          <span
            v-if="localProduct.adult_promotion_price > 0"
            class="subheading font-enforce font-weight-thin green--text">
            <h4
              style="text-decoration: line-through;"
              class="grey--text pb-0">MYR {{ localProduct.adult_selling_price }}</h4>
            <h3><v-icon
              left
              color="orange">star</v-icon>MYR {{ localProduct.adult_promotion_price }}
              <span class="orange--text text--darken-4 subheading font-weight-thin"> promotion price!</span>
            </h3>
          </span>
          <span
            v-else
            class="subheading font-enforce font-weight-thin green--text">MYR {{ localProduct.adult_selling_price }}</span>
        </div>

        <tour-cart-input-control
          :starting-adult-qty="adult_quantity"
          :starting-child-qty="child_quantity"
          :origin-adult-qty="totalOriginalData.totalBoughtAdultQty"
          :origin-child-qty="totalOriginalData.totalBoughtChildQty"
          :adult-insurance-fee="localProduct.adult_travel_insurance_fee"
          :child-insurance-fee="localProduct.child_travel_insurance_fee"
          :insurance-file="localProduct.travel_insurance_file_id"
          :tour-guide="localProduct.tour_guide"
          class="py-0"
          @inputControlData="setQuantityAndCalculation"
        />

        <v-container
          grid-list-xl
          py-0>
          <!-- <v-layout row justify-space-between  v-if="adult_discounted_amount > 0">
                    <v-flex xs6 class=" subheading">
                        Adult discount
                    </v-flex>
                    <v-flex xs6 class=" text-xs-right">
                        -{{adult_discounted_amount}}
                    </v-flex>
                </v-layout>
                <v-layout row justify-space-between   v-if="child_discounted_amount > 0">
                    <v-flex xs6 class="py-0 subheading">
                        Child discount
                    </v-flex>
                    <v-flex xs6 class="py-0 text-xs-right">
                        -{{child_discounted_amount}}
                    </v-flex>
                </v-layout> -->
          <v-layout
            column
            wrap>
            <v-flex xs-12>
              <v-list
                v-if="checkQuantityDiff()"
                class="py-0">
                <v-list-tile v-if="adult_discounted_amount > 0" >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Adult discount
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="red--text subheading">
                      -{{ adult_discounted_amount }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="child_discounted_amount > 0" >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Child discount
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="red--text subheading">
                      -{{ child_discounted_amount }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-show="adult_quantity > 0">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      MYR {{ adult_unit_price }} x
                      {{ adult_quantity }} Adult
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ adult_total_price }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-show="child_quantity > 0">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      MYR {{ child_unit_price }} x
                      {{ child_quantity }} Child
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ child_total_price }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider/>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Subtotal:
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ adult_total_price + child_total_price }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-list-tile-title>You already paid</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="red--text subheading">
                      -{{ alreadyPaid }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="is_insurance && (adult_quantity - totalOriginalData.totalBoughtAdultQty > 0)">
                  <v-list-tile-content>
                    <v-list-tile-title>Adult insurance x {{ adult_quantity - totalOriginalData.totalBoughtAdultQty }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ adultTravelInsurancePriceCalculation() }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="is_insurance && (child_quantity - totalOriginalData.totalBoughtChildQty > 0)">
                  <v-list-tile-content>
                    <v-list-tile-title>Child insurance x {{ child_quantity - totalOriginalData.totalBoughtChildQty }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ childTravelInsurancePriceCalculation() }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-if="is_tour_guide && totalAddedQuantity() > 0">
                  <v-list-tile-content>
                    <v-list-tile-title>Speaking guide</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ tourGuidePriceCalculation() }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-list-tile-title>Handling Fee</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="subheading black--text">
                      {{ localProduct.handling_fee || 0 }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-container
          fluid
          fill-height
          py-0
          px-0>
          <v-layout
            align-center
            justify-space-around
            row
            wrap
          >
            <v-flex
              xs12
              md6
              class="text-xs-center subheading">
              You added:
              <span class="green--text">
                {{ adult_quantity - totalOriginalData.totalBoughtAdultQty }} Adult
                {{ child_quantity - totalOriginalData.totalBoughtChildQty }} Child
              </span>
            </v-flex>
            <v-flex
              xs12
              md6
              class="text-xs-center subheading">
              Total Payable:
              <span class="green--text ">
                {{ total_price }}
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-actions>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          :disabled="!checkQuantityDiff()"
          :loading="isLoading"
          color="primary"
          flat
          @click.native="checkout()">Checkout</v-btn>
        <v-btn
          color="black"
          flat
          @click.native="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
    <form
      id="checkout_form"
      class="cantseeme"
      name="checkout_form"
      action="https://www.mobile88.com/epayment/entry.asp"
      method="post">
      <input
        type="hidden"
        name="MerchantCode"
        value="">
      <input
        type="hidden"
        name="RefNo"
        value="">
      <input
        type="hidden"
        name="Amount"
        value="">
      <input
        type="hidden"
        name="Currency"
        value="">
      <input
        type="hidden"
        name="ProdDesc"
        value="">
      <input
        type="hidden"
        name="UserName"
        value="">
      <input
        type="hidden"
        name="UserEmail"
        value="">
      <input
        type="hidden"
        name="UserContact"
        value="">
      <input
        type="hidden"
        name="Signature"
        value="">
      <input
        type="hidden"
        name="ResponseURL"
        value="">
      <input
        type="hidden"
        name="BackendURL"
        value="">
      <input
        class="cantseeme"
        type="submit"
        value="">
    </form>
  </v-dialog>
</template>

<script>
import _ from "lodash"
// import { AddOnPurchases } from "/imports/collections/addOnPurchases"
// import { Customers } from "/imports/collections/customers"
import { mapActions } from "vuex"
// import { Products } from "/imports/collections/products"
import TourCartInputControl from "~/components/TourCartInputControl.vue"
// import { TransactionItems } from "/imports/collections/transactionItems"
export default {
  components: {
    TourCartInputControl
  },
  props: {
    show: { type: Boolean },
    product: {
      required: true,
      type: String
    },
    transItem: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      adult_discounted_amount: 0,
      adult_quantity: 0,
      adult_total_price: 0,
      adult_unit_price: 0,
      adult_unit_price: 0,
      alreadyPaid: 0,
      child_discounted_amount: 0,
      child_quantity: 0,
      child_total_price: 0,
      child_unit_price: 0,
      isLoading: false,
      is_insurance: false,
      is_tour_guide: false,
      totalOriginalData: {
        totalBoughtPrice: 0,
        totalBoughtAdultQty: 0,
        totalBoughtChildQty: 0
      },
      total_price: 0,
      tour_guide_index: null,
      tour_guide_name: null,
      tour_guide_price: 0,
      userData: {}
    }
  },
  computed: {
    isShow: {
      // https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1
      get () {
        if (this.show) {
          this.totalBoughtAttr()
        }
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
    ...mapActions("layout", [
      "setupSnackbar"
    ]),
    adultTravelInsurancePriceCalculation () {
      return this.localProduct.adult_travel_insurance_fee * (this.adult_quantity - this.totalOriginalData.totalBoughtAdultQty)
    },
    calcPayable () {
      let addOnPrices = this.productPriceCalculation(this.localProduct, this.adult_quantity, this.child_quantity)
      let oriPrices = this.productPriceCalculation(
        this.localProduct,
        this.totalOriginalData.totalBoughtAdultQty,
        this.totalOriginalData.totalBoughtChildQty)
      let type = ["adult", "child"]

      this.total_price = addOnPrices.totalPrice - oriPrices.totalPrice
      this.alreadyPaid = oriPrices.totalPrice
      type.forEach((_type) => {
        this[`${_type}_discounted_amount`] = addOnPrices[`${_type}DiscountedAmount`]
        this[`${_type}_unit_price`] = addOnPrices[`${_type}UnitPrice`]
        this[`${_type}_total_price`] = addOnPrices[`${_type}TotalPrice`]

        if (this.is_insurance) {
          this.total_price += this[`${_type}TravelInsurancePriceCalculation`]()
        }
      })
      // if(this.is_insurance){
      //     this.total_price += this.totalAddedQuantity() * this.localProduct.travel_insurance_fee || 0;
      // }

      if (this.is_tour_guide) {
        this.total_price += this.tourGuidePriceCalculation()
      }

      this.total_price += this.localProduct.handling_fee || 0
    },
    checkout () {
      this.isLoading = true
      let checkoutAttr = { ...this.$data }
      checkoutAttr.transaction_id = this.localTransItem.transaction_id
      checkoutAttr.transaction_item_id = this.localTransItem._id
      checkoutAttr.product_id = this.localProduct._id
      checkoutAttr.product_sku = this.localProduct.sku
      checkoutAttr.product_name = this.localProduct.name
      checkoutAttr.merchant_id = this.localProduct.merchant_id
      checkoutAttr.merchant_name = this.localProduct.merchant_name
      checkoutAttr.customer_id = Meteor.userId()
      checkoutAttr.customer_name = this.userData.name
      checkoutAttr.customer_email = this.userData.email
      checkoutAttr.child_quantity = this.child_quantity - this.totalOriginalData.totalBoughtChildQty
      checkoutAttr.adult_quantity = this.adult_quantity - this.totalOriginalData.totalBoughtAdultQty
      checkoutAttr.adult_travel_insurance_unit_price = this.localProduct.adult_travel_insurance_fee || 0
      checkoutAttr.child_travel_insurance_unit_price = this.localProduct.child_travel_insurance_fee || 0
      checkoutAttr.total_discounted_amount = this.child_discounted_amount + this.adult_discounted_amount
      checkoutAttr.handling_fee = this.localProduct.handling_fee
      checkoutAttr.travel_start_date = this.localTransItem.travel_start_date
      checkoutAttr.travel_end_date = this.localTransItem.travel_end_date

      Meteor.call("preTransactionAddOnCheckout", checkoutAttr, (err, res) => {
        this.isLoading = false
        this.setupSnackbar({
          show: true,
          text: "Order recorded. Please bank in into our 96Travel account – UOB 123456789000.",
          type: "success"
        })
        // if(!err){
        //     if(typeof res.hash != 'undefined' && typeof res.addonId != 'undefined'){
        //         var pgAttr = {
        //             MerchantCode: Meteor.settings.public.pg.mCode,
        //             RefNo: res.addonId,
        //             Amount: "1.00",
        //             Currency: 'MYR',
        //             ProdDesc: 'Testing',
        //             UserName: '9696',
        //             UserEmail: 'support@96travel.com',
        //             UserContact: '0123456789',
        //             Signature: res.hash,
        //             ResponseURL: Meteor.absoluteUrl() + 'addon/ipayResponse',
        //             BackendURL: Meteor.absoluteUrl() + 'addon/pg/response'
        //         };

        //         _.each(pgAttr, function(value, key, obj){
        //             $(`#checkout_form [name=${key}]`).val(value);
        //         });

        //         $(`#checkout_form`).submit();
        //         this.setupSnackbar({
        //             show: true,
        //             text: "Redirecting to payment gateway. Please wait...",
        //             type: "success"
        //         });
        //     }
        //     else{
        //         this.setupSnackbar({
        //             show: true,
        //             text: "Error connecting to payment gateway.",
        //             type: "error"
        //         });
        //     }
        // }
        // else{
        //     this.setupSnackbar({
        //             show: true,
        //             text: "Error connecting to payment gateway.",
        //             type: "error"
        //         });
        // }
      })
    },
    checkQuantityDiff () {
      return (this.adult_quantity + this.child_quantity) !== (this.totalOriginalData.totalBoughtAdultQty + this.totalOriginalData.totalBoughtChildQty)
    },
    childTravelInsurancePriceCalculation () {
      return this.localProduct.child_travel_insurance_fee * (this.child_quantity - this.totalOriginalData.totalBoughtChildQty)
    },
    close () {
      this.$emit("close")
    },
    productPriceCalculation (product, adultQty, childQty, ignoreDiscount = false) {
      let attr = {
        adultDiscountedAmount: 0,
        adultQty,
        adultTotalPrice: 0,
        adultUnitPrice: 0,
        childDiscountedAmount: 0,
        childQty,
        childTotalPrice: 0,
        childUnitPrice: 0,
        totalPrice: 0
      }
      let type = ["adult", "child"]

      if (product) {
        attr.adultTotalPrice = adultQty * product.adult_selling_price
        attr.adultUnitPrice = product.adult_selling_price
        attr.childTotalPrice = childQty * product.kid_selling_price
        attr.childUnitPrice = product.kid_selling_price

        if (typeof product.kid_promotion_price !== "undefined" && product.kid_promotion_price > 0) {
          attr.childTotalPrice = childQty * product.kid_promotion_price
          attr.childUnitPrice = product.kid_promotion_price
        }

        if (typeof product.adult_promotion_price !== "undefined" && product.adult_promotion_price > 0) {
          attr.adultTotalPrice = adultQty * product.adult_promotion_price
          attr.adultUnitPrice = product.adult_promotion_price
        }

        if (!ignoreDiscount) {
          type.forEach((_type) => {
            let purchaseDiscount = product[`${_type}_purchase_discount`] || []
            let discountPrice = 0
            purchaseDiscount.every((_pd) => {
              if (Number(attr[`${_type}Qty`]) >= _pd[`${_type}_purchase_unit`]) {
                discountPrice = Number(_pd[`${_type}_purchase_discount`])
                return false
              }
              else {
                return true
              }
            })

            if (discountPrice > 0) {
              let oriPrice = _.clone(attr[`${_type}TotalPrice`])
              attr[`${_type}UnitPrice`] = discountPrice
              attr[`${_type}TotalPrice`] = attr[`${_type}Qty`] * discountPrice
              attr[`${_type}DiscountedAmount`] = oriPrice - attr[`${_type}TotalPrice`]
            }
          })
        }
        attr.totalPrice += attr.childTotalPrice + attr.adultTotalPrice
      }
      return attr
    },
    setQuantityAndCalculation (data) {
      const { adult_quantity, child_quantity, selectedGuide, is_insurance } = data
      this.adult_quantity = adult_quantity
      this.child_quantity = child_quantity
      this.is_insurance = is_insurance
      this.is_tour_guide = false
      if (selectedGuide !== false) {
        this.is_tour_guide = true
        this.tour_guide_index = selectedGuide
        this.tour_guide_name = this.localProduct.tour_guide[selectedGuide].tour_guide_name
        this.tour_guide_price = this.localProduct.tour_guide[selectedGuide].tour_guide_price
      }

      if (this.checkQuantityDiff()) {
        this.calcPayable()
      }
      else {
        this.total_price = 0
      }
    },
    totalAddedQuantity () {
      return (this.adult_quantity + this.child_quantity) - (this.totalOriginalData.totalBoughtAdultQty + this.totalOriginalData.totalBoughtChildQty)
    },
    totalBoughtAttr () {
      let transItems = TransactionItems.findOne({ _id: this.transItem })
      let addOnPurchases = AddOnPurchases.find({ transaction_item_id: this.transItem })
      let attr = {
        totalBoughtPrice: Number(transItems.total_price) || 0,
        totalBoughtChildQty: Number(transItems.child_quantity) || 0,
        totalBoughtAdultQty: Number(transItems.adult_quantity) || 0
      }
      addOnPurchases.forEach((addon) => {
        attr.totalBoughtChildQty += Number(addon.child_quantity)
        attr.totalBoughtAdultQty += Number(addon.adult_quantity)
        attr.totalBoughtPrice += Number(addon.total_price)
      })
      this.totalOriginalData = { ...attr }
      this.adult_quantity = attr.totalBoughtAdultQty
      this.child_quantity = attr.totalBoughtChildQty
    },
    tourGuidePriceCalculation () {
      return this.tour_guide_price
      // return this.totalAddedQuantity() * this.tour_guide_price;
    }

  },
  meteor: {
    localTransItem () {
      let transItems = TransactionItems.findOne({ _id: this.transItem })
      return transItems
    },
    localProduct () {
      let prod = Products.findOne({ _id: this.product })
      return prod
    },
    localAddOnPurchases () {
      let addOnPurchases = AddOnPurchases.find({ transaction_item_id: this.transItem })
      return addOnPurchases
    },
    customerData () {
      let cust = Customers.findOne({ user_id: Meteor.userId() })
      this.$data.userData = { ...cust }
      return cust
    }
  },
  watch: {

  }
}
</script>

<style>
/* remove spindown buttons in number type inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
