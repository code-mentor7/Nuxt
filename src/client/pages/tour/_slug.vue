<template>
  <section>
    <v-snackbar
      v-model="showAddedQty"
      :timeout="localTimeout"
      :vertical="$vuetify.breakpoint.smAndDown"
      color="green"
      top
    >
      {{ adult_quantity }} Adult {{ child_quantity }} Child
      &nbsp; Total: {{ total_price }}
      <v-btn
        color="black"
        flat
        @click="addToCart"
      >
        Add to cart
      </v-btn>
      <v-btn
        color="black"
        flat
        @click="showAddedQty = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-carousel hide-delimiters >
      <v-carousel-item
        v-for="(item,i) in mergeImages()"
        :key="i"
        :src="item.image_id | cloudinaryImageUrl"
      />
    </v-carousel>
    <v-container fluid >
      <v-layout
        row
        wrap
        justify-center
        align-center
        class="text-xs-justify">
        <v-flex
          xs12
          lg9 >
          <h3 class="display-1 font-enforce primary--text ">
            {{ localTour.name }}
          </h3>
          <!-- {{tour}} -->
        </v-flex>
        <v-flex
          xs12
          lg9
          class="py-3">
          <v-layout
            row
            wrap
            align-center
            class="headline font-weight-bold font-enforce">
            <v-flex
              lg3
              md3
              xs12 >
              <v-icon>location_on</v-icon> {{ localTour.location_to_be_display }}
            </v-flex>
            <v-flex
              lg3
              md3
              xs12>
              <v-icon>event</v-icon> {{ localTour.duration }}
            </v-flex>
            <v-flex
              lg3
              md3
              xs12>
              {{ localTour.sku }}
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          xs12
          lg9
          class="pt-3">
          <v-layout
            row
            wrap >
            <v-flex
              lg8
              xs12>
              <v-layout
                row
                wrap >
                <v-flex xs12>
                  <v-tabs
                    class="elevation-5"
                    grow
                    show-arrows
                    fixed-tabs
                    height="60px"
                    color="primary"
                  >
                    <v-tabs-slider color="black"/>
                    <v-tab
                      v-for="(value, i) in tab"
                      :href="`#${value.code}`"
                      :id="value"
                      :key="i">
                      {{ capitalize(value.name) }}
                    </v-tab>
                    <v-tab-item
                      v-for="(value, i) in tab"
                      :id="value.code"
                      :key="i"
                    >
                      <v-card
                        flat
                        color="transparent">
                        <v-card-text v-html="localTour[value.code]"/>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-flex>
                <v-flex xs12>
                  <!-- <v-subheader>Itinerary</v-subheader> -->
                  <h4 class="headline pt-5 font-enforce font-weight-bold">Itinerary</h4>
                  <v-tabs
                    v-if="localTour.itinerary.length > 0"
                    class="elevation-5"
                    grow
                    show-arrows
                    fixed-tabs
                    color="primary"
                  >
                    <v-tabs-slider color="black"/>
                    <v-tab
                      v-for="(value, i) in localTour.itinerary"
                      :href="`#${value.title}`"
                      :id="value"
                      :key="i">
                      {{ capitalize(value.title) }}
                    </v-tab>
                    <v-tab-item
                      v-for="(value, i) in localTour.itinerary"
                      :id="value.title"
                      :key="i"
                    >
                      <v-card
                        flat
                        color="transparent">
                        <v-card-title>{{ value.content_title }}</v-card-title>
                        <v-card-text v-html="value.content"/>
                        <v-card-actions
                          v-if="value.notes"
                          class="orange"
                          v-html="`Notes: ${value.notes}`"/>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              :pl-4="$vuetify.breakpoint.lgAndUp"
              :pt-4="$vuetify.breakpoint.mdAndDown"
              lg4
              xs12>
              <v-card class="elevation-5">
                <v-card-title>
                  <span
                    v-if="tour.adult_promotion_price > 0"
                    class="subheading font-enforce font-weight-thin green--text">
                    <h4
                      style="text-decoration: line-through;"
                      class="grey--text pb-0">MYR {{ localTour.adult_selling_price }}</h4>
                    <h3><v-icon
                      left
                      color="orange">star</v-icon>MYR {{ localTour.adult_promotion_price }}
                      <span class="orange--text text--darken-4 subheading font-weight-thin"> promotion price!</span>
                    </h3>
                  </span>
                  <span
                    v-else
                    class="subheading font-enforce font-weight-thin green--text">MYR {{ localTour.adult_selling_price }}</span>
                </v-card-title>
                <v-container
                  grid-list-xl
                  fluid
                  class="py-0">
                  <v-layout wrap >
                    <v-flex
                      xs12
                      class="py-0">
                      <date-picker
                        :initial-date="travel_start_date"
                        :label="'Travel Start Date'"
                        :var-name-ref="`travel_start_date`"
                        :min="minDate()"
                        @picked="datePicked"/>
                    </v-flex>
                    <v-flex
                      xs12
                      class="py-0">
                      <date-picker
                        :initial-date="travel_end_date"
                        :label="'Travel End Date'"
                        :var-name-ref="`travel_end_date`"
                        :min="endMinDate()"
                        @picked="datePicked"/>
                    </v-flex>
                  </v-layout>
                </v-container>

                <tour-cart-input-control
                  :starting-adult-qty="adult_quantity"
                  :starting-child-qty="child_quantity"
                  :adult-insurance-fee="localTour.adult_travel_insurance_fee"
                  :child-insurance-fee="localTour.child_travel_insurance_fee"
                  :insurance-file="localTour.travel_insurance_file_id"
                  :is-small-size="true"
                  :tour-guide="localTour.tour_guide"
                  class="pb-0"
                  @inputControlData="setQuantityAndCalculation"
                />
                <v-divider v-if="checkQuantityDiff()"/>
                <v-container
                  grid-list-xl
                  fluid
                  class="pt-3 pb-3">
                  <v-layout
                    wrap
                    class="py-0">
                    <v-flex
                      xs-12
                      class="py-0">
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
                        <v-list-tile v-if="is_insurance && adult_quantity > 0">
                          <v-list-tile-content>
                            <v-list-tile-title>Adult insurance x {{ adult_quantity }}</v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text class="subheading black--text">
                              {{ adultTravelInsurancePriceCalculation() }}
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile v-if="is_insurance && child_quantity > 0">
                          <v-list-tile-content>
                            <v-list-tile-title>Child insurance x {{ child_quantity }}</v-list-tile-title>
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
                        <v-list-tile v-show="localTour.handling_fee > 0">
                          <v-list-tile-content>
                            <v-list-tile-title>Handling Fee</v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text class="subheading black--text">
                              {{ localTour.handling_fee || 0 }}
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>
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
                          {{ adult_quantity }} Adult
                          {{ child_quantity }} Child
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
                <v-card-actions v-if="checkQuantityDiff()">
                  <v-btn
                    :loading="isLoading"
                    large
                    block
                    color="light-blue accent-2 white--text"
                    @click="addToCart">Add to cart</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import _ from "lodash"
import DatePicker from "~/components/DatePicker.vue"
import { mapState } from "vuex"
import moment from "moment"
// import { Products } from '/imports/collections/products';
import TourCartInputControl from "~/components/TourCartInputControl.vue"
// import TourCartInputControl from '/imports/components/TourCartInputControl/TourCartInputControl.vue';
export default {
  async asyncData ({ app, store, redirect, route }) {
    try {
      let endDate = new Date()
      if (route.query.co) {
        endDate = moment.unix(route.query.co).format("YYYY-MM-DD")
      }
      const product = await app.$axios.$post(`/api/products/slug/${route.params.slug}`, {
        query: {
          slug: route.params.slug,
          disabled: false,
          tour_addons_expiration_date: {
            $gte: endDate
          }
        }
      })
      if (!product || product.length === 0) {
        // redirect to 404
      }
      app.store.dispatch("tours/setTour", product[0])
    }
    catch (err) {
      console.log("&&&", err)
    }
  },
  auth: false,
  components: {
    DatePicker,
    TourCartInputControl
  },
  data () {
    let defaultData = {
      adult_discounted_amount: 0,
      adult_quantity: 0,
      adult_total_price: 0,
      adult_unit_price: 0,
      child_discounted_amount: 0,
      child_quantity: 0,
      child_total_price: 0,
      child_unit_price: 0,
      isLoading: false,
      is_insurance: false,
      is_tour_guide: false,
      localTimeout: 0,
      showAddedQty: false,
      tab: [
        { name: "description", code: "description" },
        { name: "highlights", code: "highlights" },
        { name: "remarks", code: "includes" },
        { name: "terms & conditions", code: "terms_and_conditions" }
      ],
      total_price: 0,
      tour_guide_index: null,
      tour_guide_name: null,
      tour_guide_price: 0,
      travel_end_date: "",
      travel_start_date: ""
    }
    if (this.$route.query.ci) {
      defaultData.travel_start_date = moment.unix(this.$route.query.ci).format("YYYY-MM-DD")
    }
    if (this.$route.query.co) {
      defaultData.travel_end_date = moment.unix(this.$route.query.co).format("YYYY-MM-DD")
    }
    return defaultData
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth.loggedIn,
      tour: state => state.tours.tour
    }),
    localTour () {
      if (this.$i18n.locale === "en") {
        return this.tour
      }
      else {
        return this.setTranslationAsPrimary()
      }
    }
  },
  created () {
  },
  methods: {
    async addToCart () {
      this.showAddedQty = false
      // if (!this.isLoggedIn) {
      //   // return this.$router.push({ name: "SignIn" })
      //   return this.$store.dispatch("setupSnackbar", {
      //     show: true,
      //     text: "We need to know who you are, please signin or signup.",
      //     type: "warning"
      //   })
      // }
      if (!this.travel_end_date || !this.travel_start_date) {
        return this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Please select your travel date.",
          type: "error"
        })
      }
      if (this.totalAddedQuantity() < this.tour.min_pax && this.isNumeric(this.tour.min_pax)) {
        return this.$store.dispatch("setupSnackbar", {
          show: true,
          text: `This tour only allow order of minimum ${this.tour.min_pax} pax.`,
          type: "error"
        })
      }
      else if (this.totalAddedQuantity() > this.tour.max_pax && this.isNumeric(this.tour.max_pax)) {
        return this.$store.dispatch("setupSnackbar", {
          show: true,
          text: `This tour only allow order of maximum ${this.tour.max_pax} pax.`,
          type: "error"
        })
      }
      this.isLoading = true
      let tourProps = _.omit(this.localTour, ["itinerary", "other_image_ids", "highlights", "description", "_id",
        "terms_and_conditions",
        "tour_guide", "travel_insurance_file_id", "notes", "includes", "cost", "created_at", "updated_at"])
      let cartProps = {
        adult_discounted_amount: this.adult_discounted_amount,
        adult_quantity: this.adult_quantity,
        adult_total_price: this.adult_total_price,
        adult_unit_price: this.adult_unit_price,
        child_discounted_amount: this.child_discounted_amount,
        child_quantity: this.child_quantity,
        child_total_price: this.child_total_price,
        child_unit_price: this.child_unit_price,
        is_insurance: this.is_insurance,
        is_tour_guide: this.is_tour_guide,
        merchant_id: this.tour.merchant_id,
        product_id: this.tour._id,
        total_price: this.total_price,
        tour_guide_index: this.tour_guide_index,
        tour_guide_name: this.tour_guide_name,
        tour_guide_price: this.tour_guide_price,
        travel_end_date: this.travel_end_date,
        travel_start_date: this.travel_start_date
      }
      console.log("### cartProps", cartProps)
      try {
        const cust = await this.$axios.$put("/api/customers", cartProps)
      }
      catch (err) {
        console.log("### ", err)
      }

      // Meteor.call("addItemToCart", cartProps, (err, res) => {
      //   this.isLoading = false
      //   if (err) {
      //     type = "error"
      //     if (err.error && err.error == 409) {
      //       msg = err.details
      //     }
      //   }

      //   this.setupSnackbar({
      //     show: true,
      //     text: msg,
      //     type: type
      //   })
      // })
    },
    adultTravelInsurancePriceCalculation () {
      let fee = 0
      if (typeof this.tour.adult_travel_insurance_fee !== "undefined") {
        fee = this.tour.adult_travel_insurance_fee
      }
      return fee * (this.adult_quantity)
    },
    calcPayable () {
      let addOnPrices = this.productPriceCalculation(this.tour, this.adult_quantity, this.child_quantity)
      // let oriPrices = this.productPriceCalculation(this.tour, 0, 0);
      let type = ["adult", "child"]

      this.total_price = addOnPrices.totalPrice
      type.forEach((_type) => {
        this[`${_type}_discounted_amount`] = addOnPrices[`${_type}DiscountedAmount`]
        this[`${_type}_unit_price`] = addOnPrices[`${_type}UnitPrice`]
        this[`${_type}_total_price`] = addOnPrices[`${_type}TotalPrice`]

        if (this.is_insurance) {
          this.total_price += this[`${_type}TravelInsurancePriceCalculation`]()
        }
      })
      // if(this.is_insurance){
      //     this.totalPrice += (this.adult_quantity + this.child_quantity) * this.tour.travel_insurance_fee || 0;
      // }

      if (this.is_tour_guide) {
        this.total_price += this.tourGuidePriceCalculation()
      }

      this.total_price += this.tour.handling_fee || 0
    },
    checkQuantityDiff () {
      return (this.adult_quantity + this.child_quantity) > 0
    },
    childTravelInsurancePriceCalculation () {
      let fee = 0
      if (typeof this.tour.child_travel_insurance_fee !== "undefined") {
        fee = this.tour.child_travel_insurance_fee
      }
      return fee * (this.child_quantity)
    },
    datePicked (date, varNameRef, index, id) {
      this.$data[`${varNameRef}`] = date
      if (varNameRef.indexOf("start_date") !== -1) {
        this.travel_end_date = ""
      }
    },
    endMinDate () {
      let date = new Date()
      date = `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
      if (this.$data[`travel_start_date`]) {
        let endMinDate = new Date(this.$data[`travel_start_date`])

        date = `${endMinDate.getFullYear()}-${this.addLeadingZero(endMinDate.getMonth() + 1)}-${this.addLeadingZero(endMinDate.getDate())}`
      }

      return date
    },
    minDate () {
      let date = new Date()
      return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
    },
    mergeImages () {
      let imgs = [{ image_id: this.tour.primary_image_id }, ...this.tour.other_image_ids]
      return imgs
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

        if (typeof product.adult_promotion_price !== "undefined" && product.kid_promotion_price > 0) {
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
        this.tour_guide_name = this.tour.tour_guide[selectedGuide].tour_guide_name
        this.tour_guide_price = this.tour.tour_guide[selectedGuide].tour_guide_price
      }

      if (this.checkQuantityDiff()) {
        this.showAddedQty = true
        this.calcPayable()
      }
      else {
        this.showAddedQty = false
        this.total_price = 0
      }
    },
    setTranslationAsPrimary () {
      let searchForExisting = _.find(this.tour.translation, { lang: this.$i18n.locale })
      let _tour = { ...this.tour }
      _tour.name = null
      _tour.description = null
      _tour.location_to_be_display = null
      _tour.highlights = null
      _tour.includes = null
      _tour.duration = null
      _tour.terms_and_conditions = null
      _tour.itinerary = []
      _tour.tour_guide = []
      if (searchForExisting) {
        return { ..._tour, ...searchForExisting }
      }
      else {
        return _tour
      }
    },
    totalAddedQuantity () {
      return (this.adult_quantity + this.child_quantity)
    },
    tourGuidePriceCalculation () {
      let fee = 0
      if (typeof this.tour_guide_price !== "undefined") {
        fee = this.tour_guide_price
      }
      return fee
      // return this.totalAddedQuantity() * fee;
    }
  }

}
</script>

<style>

</style>
