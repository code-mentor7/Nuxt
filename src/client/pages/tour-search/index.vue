<template>
  <v-container
    fluid
    grid-list-xl >
    <v-form
      @submit.prevent="search()"
      @keyup.enter.native="search()">
      <v-layout
        row
        wrap
        justify-center
        align-center>
        <v-flex
          :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
          sm12
          lg2
          xs12
        >
          <v-text-field
            v-model="tourData.search"
            :error-messages="checkError('search', validationProps.tourData, $v.tourData, 'This')"
            autofocus
            append-icon="search"
            label="Search Tour"
            name="search"
            light
            @input="$v.tourData.search.$touch()"
          />
        </v-flex>
        <v-flex
          :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
          sm12
          lg2
          xs12
          color="transparent">
          <date-picker
            :label="'Travel Start Date'"
            :var-name-ref="'startDate'"
            :initial-date="tourData.startDate"
            :min="minDate()"
            @picked="datePicked"/>
        </v-flex>
        <v-flex
          :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
          sm12
          lg2
          xs12
          color="transparent">
          <date-picker
            :label="'Travel End Date'"
            :initial-date="tourData.endDate"
            :var-name-ref="'endDate'"
            :min="endMinDate()"
            @picked="datePicked"/>
        </v-flex>
        <v-flex
          sm12
          lg2
          xs12
          class="">
          <v-btn
            block
            color="primary"
            @click="search()">Search</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-layout
      justify-center
      align-center
      class="text-xs-justify">
      <v-flex
        lg8
        sm12
        row>
        <v-data-iterator
          :items="localTours"
          :rows-per-page-items="itemPerRow"
          :pagination.sync="pagination"
          :total-items="totalCount"
          :hide-actions="totalCount == 0"
          content-tag="v-layout"
          row
          wrap
        >
          <v-flex
            v-show="totalCount == 0"
            slot="no-data"
            xs12>
            <h1
              :class="{ 'display-2': $vuetify.breakpoint.mdAndUp, 'headline': $vuetify.breakpoint.mdAndDown}"
              class="font-enforce font-weight-black ">
              Your search "{{ $route.query.keywords }}" did not match any result.
            </h1>
          </v-flex>
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            lg6>
            <v-card
              :to="{name:'Tour', params: {slug: props.item.slug}, query: setQueryParams()}"
              :hover="true"
              class="hide-overflow"
              ripple>

              <v-img
                :lazy-src=" props.item.primary_image_id | cloudinaryImageUrl | determineImgSrc"
                :src=" props.item.primary_image_id | cloudinaryImageUrl | determineImgSrc"
                height="200">
                <v-layout
                  slot="placeholder"
                  fill-height
                  align-center
                  justify-center
                  ma-0>
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"/>
                </v-layout>
              </v-img>
              <v-tooltip
                top
                color="black"
                nudge-bottom="30">
                <div slot="activator">
                  <v-card-title
                    primary-title
                    class="pb-1">
                    <h3 class="headline mb-0  primary--text ellipsis ">{{ props.item.name | removeLeadingAndTrailingDoubleQuote }}</h3>
                    <!-- <div class="overflow-hidden" style="height: 105px !important;" v-html="props.item.description"></div> -->
                  </v-card-title>
                  <v-card-text
                    class="overflow-hidden"
                    style="height: 118px !important;"
                    v-html="props.item.description"/>
                </div>
                <span>{{ props.item.name | removeLeadingAndTrailingDoubleQuote }}</span>
              </v-tooltip>

              <v-card-actions>
                <v-btn
                  flat
                  color="primary">Explore</v-btn>
                <v-spacer/>
                <span
                  v-show="props.item.tour_addons_expiration_date"
                  class="orange--text">
                  Available until {{ props.item.tour_addons_expiration_date | formatDateOnly }}
                </span>
                <span v-if="props.item.adult_promotion_price > 0">
                  <v-tooltip
                    top
                    color="black">
                    <v-chip
                      slot="activator"
                      color="green"
                      text-color="white">
                      <v-icon
                        left
                        color="orange">star</v-icon>
                      MYR {{ props.item.adult_promotion_price }}
                    </v-chip>
                    <span>Promotion now !</span>
                  </v-tooltip>
                </span>
                <span v-else>
                  <v-chip
                    color="green"
                    text-color="white">MYR {{ props.item.adult_selling_price }}</v-chip>
                </span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from "lodash"
import moment from "moment"
import {
  required
} from "vuelidate/lib/validators"
import { validationMixin } from "vuelidate"
import { mapState } from "vuex"

import DatePicker from "~/components/DatePicker.vue"

export default {
  auth: false,
  async asyncData ({ app, store, redirect, route }) {
    try {
      let startDate
      let endDate = new Date()
      let searchValue = route.query.keywords
      if (route.query.ci) {
        startDate = moment.unix(route.query.ci).format("YYYY-MM-DD")
      }
      if (route.query.co) {
        endDate = moment.unix(route.query.co).format("YYYY-MM-DD")
      }
      const products = await app.$axios.$post("/api/products", {
        search: searchValue,
        filter: {
          disabled: false,
          tour_addons_expiration_date: {
            $gte: endDate
          }
        }
      })
      app.store.dispatch("api/setTours", products)
    }
    catch (err) {
      console.log("&&&", err)
      // let text = "Verification failed. Request for resend verification email."
      // if (err.response.status === 403) {
      //   text = "Your account already verified."
      // }
      // if (err.response.status === 401) {
      //   text = "Link invalid/expired. Request for resend verification email."
      // }
      // app.store.dispatch("setupSnackbar", {
      //   show: true,
      //   text,
      //   type: "error"
      // })
      // app.store.dispatch("setVerificationMessage", false)
    }
  },
  watchQuery: true,
  components: {
    DatePicker
  },
  mixins: [ validationMixin ],
  data () {
    let defaultData = {
      itemPerRow: [10, 25, 50],
      limit: 10,
      skip: 0,
      query: {},
      selector: {},
      time: new Date().getTime(),
      totalCount: 0,
      pagination: {},
      tourData: {
        search: this.$route.query.keywords || "",
        startDate: "",
        endDate: ""
      },
      validationProps: {
        tourData: {
          search: { required }
        }
      }
    }
    if (this.$route.query.ci) {
      defaultData.tourData.startDate = moment.unix(this.$route.query.ci).format("YYYY-MM-DD")
    }
    if (this.$route.query.co) {
      defaultData.tourData.endDate = moment.unix(this.$route.query.co).format("YYYY-MM-DD")
    }
    return defaultData
  },
  computed: {
    ...mapState({
      tours: state => state.api.tours
    }),
    localTours () {
      if (this.$i18n.locale === "en") {
        return this.tours
      }
      else {
        return this.setTranslationAsPrimary()
      }
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    }
  },
  created () {
    this.query = {
      searchValue: this.$route.query.keywords
    }
    this.selector = { searchValue: this.$route.query.keywords }
  },

  methods: {
    getDataFromApi () {
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      this.skip = rowsPerPage * (page - 1) || 0
      this.limit = rowsPerPage || 0
    },
    datePicked (date, varNameRef, index, id) {
      this.tourData[`${varNameRef}`] = date
      if (varNameRef.indexOf("StartDate") !== -1) {
        this.tourData.endDate = ""
      }
    },
    minDate () {
      let date = new Date()
      return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
    },
    endMinDate () {
      let date = new Date()
      date = `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
      if (this.tourData.startDate) {
        let endMinDate = new Date(this.tourData.startDate)

        date = `${endMinDate.getFullYear()}-${this.addLeadingZero(endMinDate.getMonth() + 1)}-${this.addLeadingZero(endMinDate.getDate())}`
      }

      return date
    },
    search () {
      this.$v.$touch()
      if (!this.$v.invalid) {
        const unixStartDate = this.tourData.startDate ? moment(this.tourData.startDate, "YYYY-MM-DD").format("X") : ""
        const unixEndDate = this.tourData.endDate ? moment(this.tourData.endDate, "YYYY-MM-DD").format("X") : ""
        let routeQuery = {
          keywords: this.tourData.search,
          ci: unixStartDate,
          co: unixEndDate
        }
        this.$router.push({ name: `tour-search___${this.$i18n.locale}`, query: routeQuery })
      }
      else {
        this.setupSnackbar({
          show: true,
          text: "Search keyword is required.",
          type: "warning"
        })
      }
    },
    setTranslationAsPrimary () {
      let tourArr = []
      this.tours.forEach((tour) => {
        let searchForExisting = _.find(tour.translation, { lang: this.$i18n.locale })
        let _tour = { ...tour }
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
          tourArr.push({ ..._tour, ...searchForExisting })
        }
        else {
          tourArr.push({ ..._tour })
        }
      })
      if (tourArr.length === 0) {
        tourArr = this.tours
      }
      return tourArr
    },
    setQueryParams () {
      let query = { ci: "", co: "" }
      if (this.tourData.startDate) {
        query.ci = moment(this.tourData.startDate).format("X")
      }
      if (this.tourData.endDate) {
        query.co = moment(this.tourData.endDate).format("X")
      }
      return query
    }
  },
  validations () {
    return this.validationProps
  }

}
</script>

<style>
.card-scroll {
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
