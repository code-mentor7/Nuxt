<template>
  <v-container
    :px-0="$vuetify.breakpoint.smAndDown"
    :py-0="$vuetify.breakpoint.smAndDown"
    fluid
    fill-height>
    <v-layout
      justify-center
      align-center
      class="text-xs-justify">
      <v-flex
        :xs8="$vuetify.breakpoint.mdAndUp"
        :xs12="$vuetify.breakpoint.smAndDown">
        <h3 class="display-1 font-enforce font-weight-thin primary--text pb-3">
          Shopping Cart
        </h3>
        <v-layout
          v-if="carts.length > 0"
          row
          wrap>
          <v-flex
            v-if="$vuetify.breakpoint.smAndDown"
            xs12>
            <v-card class="elevation-5">
              <v-list class="py-0">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Subtotal
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading">
                      {{ subtotal }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Handling Fee
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading">
                      {{ handling_fee }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Total Payable
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading">
                      {{ total_amount }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn
                  :loading="isLoading"
                  large
                  block
                  color="success"
                  @click="checkout">Checkout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex
            lg8
            xs12>
            <template v-for="(item, index) in carts">
              <v-layout
                :key="index"
                row
                wrap
                class="py-1 hidden-sm-and-down" >
                <v-flex
                  xs2
                  class="py-0" >
                  <v-img
                    :height="'100%'"
                    :src=" item.primary_image_id | cloudinaryImageUrl | determineImgSrc"/>
                </v-flex>
                <v-flex xs9>
                  <v-card-title
                    primary-title
                    class="py-0 pb-0">
                    <a
                      :href="`/tour/${item.slug}`"
                      class="headline primary--text font-weight-thin font-enforce ellipsis">
                      {{ item.name }}
                    </a>
                  </v-card-title>
                  <v-card-title class="pt-1 pb-1 ">
                    <span class=" title font-weight-thin font-enforce green--text">MYR{{ item.cart_price }}</span>
                    <v-spacer/>
                    <span
                      v-if="item.adult_quantity > 0"
                      class="font-weight-bold"> {{ item.adult_quantity }} Adult &nbsp;</span>
                    <span
                      v-if="item.child_quantity > 0"
                      class="font-weight-bold">{{ item.child_quantity }} Child</span>
                  </v-card-title>
                  <v-card-text class="py-0 ">
                    <v-chip
                      v-if="item.is_insurance"
                      small
                      color="orange darken-4"
                      text-color="white">
                      Travel Insurance
                    </v-chip>
                    <v-chip
                      v-if="item.is_tour_guide"
                      small
                      color="orange darken-4"
                      text-color="white">
                      {{ item.tour_guide_name }}
                    </v-chip>
                  </v-card-text>
                  <v-card-text class="py-1 font-weight-bold">
                    Travelling from {{ item.travel_start_date | formatDateOnly }} to {{ item.travel_end_date | formatDateOnly }}
                  </v-card-text>
                </v-flex>
                <v-flex xs1>
                  <v-icon
                    color="black"
                    @click="removeItemFromCart(index)">close</v-icon>
                </v-flex>
                <v-flex
                  v-if="index + 1 < carts.length"
                  xs12>
                  <v-divider
                    class="grey lighten-2"

                  />
                </v-flex>
              </v-layout>

              <div
                :key="`${index}mobile`"
                class="hidden-md-and-up">
                <v-img
                  :src=" item.primary_image_id | cloudinaryImageUrl | determineImgSrc"
                  height="100px"/>
                <v-card-title
                  primary-title
                  class="pt-3 pb-0">
                  <a
                    :href="`/tour/${item.slug}`"
                    class="headline primary--text font-weight-thin font-enforce ellipsis">
                    {{ item.name }}
                  </a>
                </v-card-title>
                <v-card-title class="py-0 font-weight-bold">
                  <span class=" title font-weight-thin font-enforce green--text">MYR{{ item.cart_price }}</span>
                  <v-spacer/>
                  <span v-if="item.adult_quantity > 0"> {{ item.adult_quantity }} Adult &nbsp;</span>
                  <span v-if="item.child_quantity > 0">{{ item.child_quantity }} Child</span>
                </v-card-title>
                <v-card-text class="py-0">
                  <v-chip
                    v-if="item.is_insurance"
                    small
                    color="orange darken-4"
                    text-color="white">
                    Travel Insurance
                  </v-chip>
                  <v-chip
                    v-if="item.is_tour_guide"
                    small
                    color="orange darken-4"
                    text-color="white">

                    {{ item.tour_guide_name }}
                  </v-chip>
                </v-card-text>
                <v-card-text class="pt-0 pb-2 font-weight-bold">
                  <div>Travelling from {{ item.travel_start_date | formatDateOnly }} to {{ item.travel_end_date | formatDateOnly }}</div>
                </v-card-text>
                <v-card-text
                  v-if="index + 1 < carts.length"
                  class="py-3">
                  <v-divider
                    class="grey lighten-2"
                  />
                </v-card-text>
              </div>
            </template>
          </v-flex>
          <v-flex
            v-if="$vuetify.breakpoint.mdAndUp"
            lg4>
            <v-card class="elevation-5">
              <v-list class="py-0">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Subtotal
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading">
                      {{ subtotal }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Handling Fee
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading">
                      {{ handling_fee }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="font-weight-black">
                      Total Payable
                    </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class=" subheading font-weight-black green--text">
                      {{ total_amount }}
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn
                  :loading="isLoading"
                  large
                  block
                  color="success"
                  @click="checkout">Checkout</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout
          v-else
          row
          wrap>
          <v-flex xs12>
            No items in cart at the moment.
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
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
  </v-container>
</template>

<script>
import _ from "lodash"
// import { Customers } from "/imports/collections/customers"
import { mapState } from "vuex"
// import { Products } from "/imports/collections/products"

export default {
  data () {
    let defaultData = {
      handling_fee: 0,
      isLoading: false,
      subtotal: 0,
      total_amount: 0
    }
    return defaultData
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.loggedIn,
      customerData: state => state.auth.user
    }),
    carts () {
      let cart = []
      let totalPrice = 0
      let totalHandlingFee = 0

      this.customerData.cart.forEach((_cart, index) => {
        let cartPrice = 0
        let discountedAmount = 0
        _cart.is_discount = false
        // var prod = Products.findOne({ _id: _cart.product_id })
        if (_cart.product_id) {
          delete _cart.handling_fee
          // prod = _.pick(prod, ["adult_selling_price", "adult_promotion_price", "kid_selling_price", "kid_promotion_price",
          //   "name", "slug", "primary_image_id", "merchant_id", "sku",
          //   "adult_travel_insurance_fee", "child_travel_insurance_fee", "handling_fee", "adult_purchase_discount", "child_purchase_discount"])

          _cart = { ..._cart, ..._cart.product_id }

          let cartCalObj = this.productPriceCalculation(_cart, _cart.adult_quantity, _cart.child_quantity)
          cartPrice = Number(cartCalObj.totalPrice)
          _cart.adult_discount_amount = cartCalObj.adultDiscountedAmount
          _cart.child_discount_amount = cartCalObj.childDiscountedAmount
          _cart.adult_unit_price = cartCalObj.adultUnitPrice
          _cart.child_unit_price = cartCalObj.childUnitPrice

          discountedAmount = cartCalObj.adultDiscountedAmount + cartCalObj.childDiscountedAmount
          if (discountedAmount > 0) {
            _cart.is_discount = true
          }
          if (_cart.product_id.handling_fee) {
            totalHandlingFee += _cart.product_id.handling_fee
          }
          totalPrice += cartPrice
          _cart.cart_price = cartPrice
          _cart.discounted_amount = discountedAmount
        }
        cart.push(_cart)
      })
      this.handling_fee = totalHandlingFee
      this.subtotal = totalPrice
      this.total_amount = this.handling_fee + this.subtotal
      return cart
    }
  },
  created () {
    if (this.userId) {
      this.$subscribe("getCartData", () => [])
    }
  },
  methods: {
    // ...mapActions("layout", [
    //   "setupSnackbar",
    //   "setLoading"
    // ]),
    checkout () {
      this.isLoading = true
      // let roundOffTotalAmount = Number(Math.round(this.total_amount+'e1')+'e-1');
      // let roundedOff = Number(Math.round(roundOffTotalAmount - this.total_amount +'e2')+'e-2');
      let transAttr = {
        // customer_id: Meteor.userId(),
        customer_name: this.customerData.name,
        customer_email: this.customerData.email,
        total_amount: this.total_amount,
        // roundoff_total_amount: roundOffTotalAmount,
        // rounded_off: roundedOff,
        merchant_ids: []
      }
      let transItemArr = []

      this.carts.forEach((_cart) => {
        let transItemAttr = { ..._cart }
        transItemAttr.transaction_id = null
        transItemAttr.product_id = _cart.product_id
        transItemAttr.product_sku = _cart.sku
        transItemAttr.product_name = _cart.name
        transItemAttr.total_price = this.total_amount
        transItemAttr.customer_id = transAttr.customer_id
        transItemAttr.customer_name = transAttr.customer_name
        transItemAttr.customer_email = transAttr.customer_email
        transItemArr.push(transItemAttr)
        transAttr.merchant_ids.push(transItemAttr.merchant_id)
      })

      transAttr.items = transItemArr

      // Meteor.call("preTransactionCheckout", transAttr, (err, res) => {
      //   this.isLoading = false
      //   this.setupSnackbar({
      //     show: true,
      //     text: "Order recorded. Please bank in into our 96Travel account – UOB 123456789000.",
      //     type: "success"
      //   })
      //   Meteor.call("customerUpdate", { cart: [] }, (err, res) => {

      //   })
      //   if (!err) {
      //     // if(typeof res.hash != 'undefined' && typeof res.transaction_id != 'undefined'){
      //     //     var pgAttr = {
      //     //         MerchantCode: Meteor.settings.public.pg.mCode,
      //     //         RefNo: res.transaction_id,
      //     //         Amount: "1.00",
      //     //         Currency: 'MYR',
      //     //         ProdDesc: 'Testing',
      //     //         UserName: '9696',
      //     //         UserEmail: 'support@96travel.com',
      //     //         UserContact: '0123456789',
      //     //         Signature: res.hash,
      //     //         ResponseURL: Meteor.absoluteUrl() + 'addon/ipayResponse',
      //     //         BackendURL: Meteor.absoluteUrl() + 'addon/pg/response'
      //     //     };

      //     //     _.each(pgAttr, function(value, key, obj){
      //     //         $(`#checkout_form [name=${key}]`).val(value);
      //     //     });

      //     //     $(`#checkout_form`).submit();
      //     //     this.setupSnackbar({
      //     //         show: true,
      //     //         text: "Redirecting to payment gateway. Please wait...",
      //     //         type: "success"
      //     //     });
      //     // }
      //     // else{
      //     //     this.setupSnackbar({
      //     //         show: true,
      //     //         text: "Error connecting to payment gateway.",
      //     //         type: "error"
      //     //     });
      //     // }
      //   }
      //   else {
      //     // this.setupSnackbar({
      //     //     show: true,
      //     //     text: "Error connecting to payment gateway.",
      //     //     type: "error"
      //     // });
      //   }
      // })
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

        if (product.is_insurance) {
          // attr.totalPrice += (adultQty + childQty) * product.travel_insurance_fee || 0;
          type.forEach((_type) => {
            attr.totalPrice += product[`${_type}_travel_insurance_fee`] * attr[`${_type}Qty`]
          })
        }

        if (product.is_tour_guide) {
          attr.totalPrice += product.tour_guide_price || 0
          // attr.totalPrice += (adultQty + childQty) * product.tour_guide_price || 0;
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
    removeItemFromCart (index) {
      let currentCart = [...this.carts]
      currentCart.splice(index, 1)
      // Meteor.call("removeItemFromCart", currentCart, (err, res) => {
      //   let msg = "Item removed from cart"
      //   let type = "success"
      //   if (err) {
      //     console.log(err)
      //     type = "error"
      //     msg = "Unable to remove item from cart"
      //   }
      //   this.setupSnackbar({
      //     show: true,
      //     text: msg,
      //     type: type
      //   })
      // })
    }
  }
  // meteor: {
  //   userId () {
  //     return Meteor.userId()
  //   },
  //   customerData () {
  //     return Customers.findOne({ user_id: Meteor.userId() })
  //   },
  //   carts () {
  //     let customerData = Customers.findOne({ user_id: Meteor.userId() })
  //     let cart = []
  //     let totalPrice = 0
  //     let totalHandlingFee = 0

  //     customerData.cart.forEach((_cart, index) => {
  //       let cartPrice = 0
  //       let discountedAmount = 0
  //       _cart.is_discount = false
  //       var prod = Products.findOne({ _id: _cart.product_id })
  //       if (prod) {
  //         delete _cart.handling_fee
  //         prod = _.pick(prod, ["adult_selling_price", "adult_promotion_price", "kid_selling_price", "kid_promotion_price",
  //           "name", "slug", "primary_image_id", "merchant_id", "sku",
  //           "adult_travel_insurance_fee", "child_travel_insurance_fee", "handling_fee", "adult_purchase_discount", "child_purchase_discount"])

  //         _cart = { ..._cart, ...prod }

  //         let cartCalObj = this.productPriceCalculation(_cart, _cart.adult_quantity, _cart.child_quantity)
  //         cartPrice = Number(cartCalObj.totalPrice)
  //         _cart.adult_discount_amount = cartCalObj.adultDiscountedAmount
  //         _cart.child_discount_amount = cartCalObj.childDiscountedAmount
  //         _cart.adult_unit_price = cartCalObj.adultUnitPrice
  //         _cart.child_unit_price = cartCalObj.childUnitPrice

  //         discountedAmount = cartCalObj.adultDiscountedAmount + cartCalObj.childDiscountedAmount
  //         if (discountedAmount > 0) {
  //           _cart.is_discount = true
  //         }
  //         if (prod.handling_fee) {
  //           totalHandlingFee += prod.handling_fee
  //         }
  //         totalPrice += cartPrice
  //         _cart.cart_price = cartPrice
  //         _cart.discounted_amount = discountedAmount
  //       }
  //       cart.push(_cart)
  //     })
  //     this.handling_fee = totalHandlingFee
  //     this.subtotal = totalPrice
  //     this.total_amount = this.handling_fee + this.subtotal
  //     this.setLoading(!this.$subReady.getCartData)
  //     return cart
  //   }

  // }

}
</script>

<style>

</style>
