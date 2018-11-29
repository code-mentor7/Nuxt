<template>
  <v-container
    fluid
    grid-list-xl>
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
            v-model="hotelData.search"
            :error-messages="checkError('search', validationProps.hotelData, $v.hotelData, 'This')"
            autofocus
            append-icon="search"
            label="Search Hotel"
            name="search"
            light
            @input="$v.hotelData.search.$touch()"
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
          :items="hotels"
          :rows-per-page-items="itemPerRow"
          :pagination.sync="pagination"
          :total-items="hotelsCount"
          :hide-actions="hotelsCount == 0"
          content-tag="v-layout"
          row
          wrap
        >
          <v-flex
            v-show=" hotelsCount == 0"
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
              :href="props.item.url | removeLeadingAndTrailingDoubleQuote"
              :hover="true"
              class="hide-overflow">

              <v-img
                :lazy-src=" props.item.photo1 | determineImgSrc"
                :src=" props.item.photo1 | determineImgSrc"
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
                <v-card-title
                  slot="activator"
                  primary-title
                  style="min-height: 200px">
                  <h3 class="headline primary--text mb-0  ellipsis">{{ props.item.hotel_name | removeLeadingAndTrailingDoubleQuote }}</h3>
                  <v-card-text
                    class="py-0 overflow-hidden"
                    style="height: 105px !important;">
                    {{ props.item.overview | removeLeadingAndTrailingDoubleQuote }}
                  </v-card-text>
                  <!-- <div  class="overflow-hidden" style="height: 100px !important;">{{props.item.overview | removeLeadingAndTrailingDoubleQuote }}</div> -->
                </v-card-title>
                <span>{{ props.item.hotel_name | removeLeadingAndTrailingDoubleQuote }}</span>
              </v-tooltip>

              <v-card-actions>
                <v-btn
                  flat
                  color="primary">Explore</v-btn>
                <v-spacer/>
                <v-chip
                  color="green"
                  text-color="white">MYR {{ props.item.rates_from | convertToMYRFromUSD }}</v-chip>
              </v-card-actions>
            </v-card>
            <!-- <v-card raised :href="props.item.url | removeLeadingAndTrailingDoubleQuote" :hover="true">
                        <v-layout class="hidden-sm-and-down">
                            <v-flex xs2 class="py-0">
                                <v-card-media
                                    :src=" props.item.photo1 | determineImgSrc"
                                    height="100%">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs10>
                                <v-card-title primary-title>
                                    <div class="headline primary--text">{{props.item.hotel_name | removeLeadingAndTrailingDoubleQuote}}</div>
                                </v-card-title>
                                <v-card-text>
                                    <div>{{props.item.overview | truncateTextDisplay | removeLeadingAndTrailingDoubleQuote}}</div>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                        <div class="hidden-md-and-up">
                            <v-card-media
                                :src=" props.item.photo1 | determineImgSrc"
                                height="100px">
                            </v-card-media>
                            <v-card-title primary-title class="pb-0">
                                <h3 class="headline mb-0  primary--text  ">{{props.item.hotel_name | removeLeadingAndTrailingDoubleQuote}}</h3>
                            </v-card-title>
                            <v-card-text>
                                {{props.item.overview | truncateTextDisplay | removeLeadingAndTrailingDoubleQuote}}
                            </v-card-text>
                        </div>
                        <v-divider></v-divider>
                    </v-card> -->
          </v-flex>
        </v-data-iterator>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from "lodash"
import moment from "moment"
import { required } from "vuelidate/lib/validators"
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
      const getData = app.$axios.$post("/api/hotels", {
        search: searchValue,
        filter: {
          disabled: false,
          tour_addons_expiration_date: {
            $gte: endDate
          }
        }
      })
      const getCount = app.$axios.$post("/api/hotels/count", {
        search: searchValue,
        filter: {
          disabled: false,
          tour_addons_expiration_date: {
            $gte: endDate
          }
        }
      })
      let promiseArr = [
        getData,
        getCount
      ]

      let hotels = []
      let hotelsCount = 0
      await Promise.all(promiseArr)
        .then((promiseResultArray) => {
          hotels = promiseResultArray[0]
          hotelsCount = promiseResultArray[1]
        })
      app.store.dispatch("hotels/setHotels", hotels)
      app.store.dispatch("hotels/setHotelsCount", hotelsCount)
    }
    catch (err) {
      console.log("&&&", err)
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
      pagination: {},
      hotelData: {
        search: this.$route.query.keywords || "",
        startDate: "",
        endDate: ""
      },
      validationProps: {
        hotelData: {
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
      hotels: state => state.hotels.hotels,
      hotelsCount: state => state.hotels.hotelsCount
    })
    // loading () {
    //   this.setLoading(!this.$subReady.getHotelData)
    //   return !this.$subReady.getHotelData
    // }
  },
  watch: {
    pagination: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    }
    // search (val) {
    //   let queryObj = {}
    //   this.searchValue = val
    //   this.debouncedSearch()
    // }
  },
  created () {
    // this.query = {
    //   searchValue: this.$route.query.keywords
    // }
    // this.selector = { searchValue: this.$route.query.keywords }
    // this.$subscribe("getHotelData", () => [this.query.searchValue, this.skip, this.limit])
    // this.$subscribe("getHotelsCount", () => [this.query.searchValue])
  },
  methods: {
    async getDataFromApi () {
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      this.skip = rowsPerPage * (page - 1) || 0
      if (this.skip === 0 && this.limit === rowsPerPage) {
        return ""
      }
      this.limit = rowsPerPage || 0
      try {
        this.$nuxt.$loading.start()

        let startDate
        let endDate = new Date()
        let searchValue = this.$route.query.keywords
        if (this.$route.query.ci) {
          startDate = moment.unix(this.$route.query.ci).format("YYYY-MM-DD")
        }
        if (this.$route.query.co) {
          endDate = moment.unix(this.$route.query.co).format("YYYY-MM-DD")
        }
        const getData = this.$axios.$post("/api/hotels", {
          search: searchValue,
          filter: {
            disabled: false,
            tour_addons_expiration_date: {
              $gte: endDate
            }
          }
        })
        let promiseArr = [
          getData
        ]

        let hotels = []
        await Promise.all(promiseArr)
          .then((promiseResultArray) => {
            hotels = promiseResultArray[0]
          })

        this.$nuxt.$loading.finish()
        this.$store.dispatch("hotels/setHotels", hotels)
      }
      catch (err) {

      }
    },
    datePicked (date, varNameRef, index, id) {
      this.hotelData[`${varNameRef}`] = date
      if (varNameRef.indexOf("StartDate") !== -1) {
        this.hotelData.endDate = ""
      }
    },
    minDate () {
      let date = new Date()
      return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
    },
    endMinDate () {
      let date = new Date()
      date = `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
      if (this.hotelData.startDate) {
        let endMinDate = new Date(this.hotelData.startDate)

        date = `${endMinDate.getFullYear()}-${this.addLeadingZero(endMinDate.getMonth() + 1)}-${this.addLeadingZero(endMinDate.getDate())}`
      }

      return date
    },
    search () {
      this.$v.$touch()
      if (!this.$v.invalid) {
        let routeQuery = {
          keywords: this.hotelData.search,
          ci: this.hotelData.startDate,
          co: this.hotelData.endDate
        }
        // this.$router.push({ name: "HotelSearchResult", query: routeQuery })
        // this.query.searchValue = this.hotelData.search
        this.$router.push({ name: `hotel-search___${this.$i18n.locale}`, query: routeQuery })
        // this.limit = 10
        // this.skip = 0
      }
      else {
        this.$store.dispatch("setupSnackbar", {
          show: true,
          text: "Search keyword is required.",
          type: "warning"
        })
      }
    }
  },
  validations () {
    return this.validationProps
  }
}
</script>

<style>

</style>
