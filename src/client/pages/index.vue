<template>
  <section>
    <v-carousel
      v-if="landingPage"
      hide-delimiters
      class="wrapper-slide">
      <v-carousel-item
        v-for="(item,i) in landingPage.main_carousel"
        :key="i"
        :src="item.media_id | cloudinaryImageUrl"
        :lazy-src=" item.media_id | cloudinaryImageUrl"
      >
        <v-container fill-height >
          <v-layout
            row
            wrap
            align-center
            justify-center
          >
            <v-flex
              xs12
              class="text-xs-center">
              <h1
                :class="{ 'display-4': $vuetify.breakpoint.mdAndUp, 'display-3': $vuetify.breakpoint.mdAndDown}"
                class="font-enforce white--text   font-weight-black text-xs-center">
                {{ item.carousel_header }}
              </h1>
              <div
                :class="{headline: $vuetify.breakpoint.mdAndUp, subheading: $vuetify.breakpoint.mdAndDown}"
                class=" font-weight-black white--text font-enforce mt-3  text-xs-center">
                {{ item.carousel_content }}
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-carousel-item>

    </v-carousel>
    <v-tabs
      v-if="landingPage"
      centered
      height="60px"
      color="blue-gradient"
      icons-and-text
    >
      <v-tabs-slider color="black"/>

      <v-tab
        href="#tour"
        @click="changeTab()">
        {{ $t('landingPage.tour') }}
        <v-icon>near_me</v-icon>
      </v-tab>

      <v-tab
        href="#hotel"
        @click="changeTab()">
        {{ $t('landingPage.hotel') }}
        <v-icon>hotel</v-icon>
      </v-tab>

      <!-- <v-tab href="#cruise" @click="changeTab()">
                cruise
                <v-icon>directions_boat</v-icon>
            </v-tab> -->

      <v-tab-item
        v-for="(value, i) in tab"
        :id="value"
        :key="i"
      >
        <v-card
          flat
          color="transparent">
          <v-form
            class="pb-2"
            @submit.prevent="search(value)"
            @keyup.enter.native="search(value)">
            <v-container
              fluid
              grid-list-xl>
              <v-layout
                row
                wrap
                justify-center
                align-center
                class="text-xs-center"
              >
                <v-flex
                  :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
                  sm12
                  md3
                  xs12
                  lg2
                >
                  <v-text-field
                    v-model="homeData[value + 'Search']"
                    :label="$t('landingPage.search')"
                    :name="`${value} Search`"
                    autofocus
                    append-icon="search"
                    light
                    @input="$v.homeData[value + 'Search'].$touch()"
                  />
                </v-flex>
                <v-flex
                  :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
                  sm12
                  md3
                  xs12
                  lg2
                  color="transparent">
                  <date-picker
                    :label="$t('landingPage.travelStartDate')"
                    :var-name-ref="`${value}StartDate`"
                    :min="minDate()"
                    :index="value"
                    @picked="datePicked"/>
                </v-flex>
                <v-flex
                  :class="{'pb-0 pt-0': $vuetify.breakpoint.mdAndDown}"
                  sm12
                  md3
                  xs12
                  lg2
                  color="transparent">
                  <date-picker
                    :label="$t('landingPage.travelEndDate')"
                    :var-name-ref="`${value}EndDate`"
                    :min="endMinDate(value)"
                    :index="value"
                    @picked="datePicked"/>
                </v-flex>
                <v-flex
                  sm12
                  md3
                  lg2
                  xs12
                  class="pt-0 pb-0">
                  <v-btn
                    block
                    color="primary"
                    @click="search(value)">{{ $t('landingPage.search') }}</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-container fluid >
      <v-layout
        row
        wrap
        justify-center
        align-center
        class="text-xs-justify">
        <v-flex
          lg9
          xs12>
          <v-layout
            row
            wrap
            align-center>
            <v-flex
              xs12
              class="px-3">
              <h3 class="layout justify-center font-weight-bold display-1 font-enforce">{{ $t('landingPage.hotelMainTitle') }}</h3>
              <v-subheader class="font-weight-bold headline font-enforce">
                {{ $t(`landingPage.${landingPage.section_sub_title_1}`) }}
                <v-divider
                  v-show="$vuetify.breakpoint.mdAndUp"
                  class="ml-3"/>
              </v-subheader>
            </v-flex>
            <template v-for="(value, i) in landingPage.hotel_destination_1">
              <v-flex
                :key="`hotel_destination_1${i}`"
                lg4
                xs12
                class="px-3 py-3"
                @click="hotelDestinationClick(value.title)">
                <v-card :hover="true">
                  <v-img
                    :src=" value.media_id | cloudinaryImageUrl | determineImgSrc"
                    height="200px"
                    gradient="to top right, rgba(100,115,201,0), rgba(25,32,72,.7)"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"/>
                    </v-layout>
                    <v-layout
                      pa-2
                      row
                      fill-height
                      class="lightbox white--text">
                      <v-spacer/>
                      <v-flex shrink>
                        <div
                          class="headline white--text font-enforce font-weight-thin"
                          v-text="$t(`landingPage.${value.title}`)"/>

                      </v-flex>

                    </v-layout>
                    <!-- <v-container
                      fill-height
                      fluid
                      pa-2
                    >
                      <v-layout
                        fill-height
                        row
                        wrap>
                        <v-flex
                          xs12
                          align-end
                          flexbox>
                          <span
                            class="headline white--text font-enforce font-weight-thin"
                            v-text="$t(`landingPage.${value.title}`)"/>
                        </v-flex>
                      </v-layout>
                    </v-container> -->
                  </v-img>
                </v-card>
              </v-flex>
            </template>
            <!-- <template v-for="(value, i) in landingPage.hotel_destination_1">
              <v-flex
                :key="`hotel_destination_1${i}`"
                lg4
                xs12
                class="px-3 py-3"
                @click="hotelDestinationClick(value.title)">
                <v-card :hover="true">
                  <v-img
                    :src=" value.media_id | cloudinaryImageUrl | determineImgSrc"
                    :lazy-src=" value.media_id | cloudinaryImageUrl | determineImgSrc"
                    height="200px"
                    gradient="to top right, rgba(100,115,201,0), rgba(25,32,72,.7)"
                  >
                    <v-container
                      fill-height
                      fluid
                      pa-2
                    >
                      <v-layout
                        fill-height
                        row
                        wrap>
                        <v-flex
                          xs12
                          align-end
                          flexbox>
                          <span
                            class="headline white--text font-enforce font-weight-thin"
                            v-text="$t(`landingPage.${value.title}`)"/>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-card>
              </v-flex>
            </template> -->
            <v-flex
              xs12
              class="px-3">
              <v-subheader class="font-weight-bold headline font-enforce">
                {{ $t(`landingPage.${landingPage.section_sub_title_2}`) }}<v-divider
                  v-show="$vuetify.breakpoint.mdAndUp"
                  class="ml-3"/>
              </v-subheader>
            </v-flex>
            <template v-for="(value, i) in landingPage.hotel_destination_2">
              <v-flex
                :key="`hotel_destination_2${i}`"
                lg4
                xs12
                class="px-3 py-3"
                @click="hotelDestinationClick(value.title)">
                <v-card :hover="true">
                  <v-img
                    :src=" value.media_id | cloudinaryImageUrl | determineImgSrc"
                    height="200px"
                    gradient="to top right, rgba(100,115,201,0), rgba(25,32,72,.7)"
                  >
                    <v-layout
                      slot="placeholder"
                      fill-height
                      align-center
                      justify-center
                      ma-0
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"/>
                    </v-layout>
                    <v-layout
                      pa-2
                      row
                      fill-height
                      class="lightbox white--text">
                      <v-spacer/>
                      <v-flex shrink>
                        <div
                          class="headline white--text font-enforce font-weight-thin"
                          v-text="$t(`landingPage.${value.title}`)"/>

                      </v-flex>

                    </v-layout>
                    <!-- <v-container
                      fill-height
                      fluid
                      pa-2
                    >
                      <v-layout
                        fill-height
                        row
                        wrap>
                        <v-flex
                          xs12
                          align-end
                          flexbox>
                          <span
                            class="headline white--text font-enforce font-weight-thin"
                            v-text="$t(`landingPage.${value.title}`)"/>
                        </v-flex>
                      </v-layout>
                    </v-container> -->
                  </v-img>
                </v-card>
              </v-flex>
            </template>
          </v-layout>
        </v-flex>
        <v-flex
          lg9
          xs12>
          <v-layout
            column
            wrap
            align-center>
            <v-flex
              v-if="!landingPage.section_text_1_disabled"
              xs12
              sm4
              class="">
              <v-card class="elevation-0 transparent">
                <v-card-title
                  primary-title
                  class="layout justify-center pb-0">
                  <div class="headline font-enforce font-weight-bold text-uppercase">{{ landingPage.section_text_1_title }}</div>
                </v-card-title>
                <v-card-text>
                  {{ landingPage.section_text_1_content }}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex
              v-if="!landingPage.section_text_2_disabled"
              xs12
              sm4
              class="">
              <v-card class="elevation-0 transparent">
                <v-card-title
                  primary-title
                  class="layout justify-center pb-0">
                  <div class="headline font-enforce font-weight-bold text-uppercase">{{ landingPage.section_text_2_title }}</div>
                </v-card-title>
                <v-card-text>
                  {{ landingPage.section_text_2_content }}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import moment from "moment"
import DatePicker from "~/components/DatePicker.vue"

import { mapState } from "vuex"

export default {
  auth: false,
  layout: "transparentNav",
  components: {
    DatePicker
  },
  head () {
    return {
      title: "Home Page Meta Title",
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
        },
        {
          name: "og:title",
          content: "OG Title"
        }
      ]
    }
  },
  data () {
    return {
      homeData: {
        hotelSearch: "",
        hotelStartDate: "",
        hotelEndDate: "",
        cruiseSearch: "",
        cruiseStartDate: "",
        cruiseEndDate: "",
        tourSearch: "",
        tourStartDate: "",
        tourEndDate: ""
      },
      startDatePicker: false,
      tab: ["tour", "hotel"]
    }
  },
  i18n: {
    messages: {
      en: {
        landingPage: {
          Asia: "Asia",
          Australia: "Australia",
          Austria: "Austria",
          Thailand: "Thailand",
          Europe: "Europe",
          France: "France",
          Germany: "Germany",
          hotel: "Hotel",
          hotelMainTitle: "Hotels of Popular Destination",
          Japan: "Japan",
          Indonesia: "Indonesia",
          Italy: "Italy",
          Korea: "Korea",
          search: "Search",
          Switzerland: "Switzerland",
          Taiwan: "Taiwan",
          tour: "Tour",
          travelStartDate: "Travel Start Date",
          travelEndDate: "Travel End Date",
          Vietnam: "Vietnam"
        }
      },
      zh: {
        landingPage: {
          Asia: "亚洲",
          Australia: "澳洲",
          Austria: "奥地利",
          Thailand: "泰国",
          Europe: "欧洲",
          France: "法国",
          Germany: "德国",
          hotel: "酒店",
          hotelMainTitle: "热门胜地酒店",
          Japan: "日本",
          Indonesia: "印尼",
          Italy: "意大利",
          Korea: "韩国",
          search: "搜索",
          Switzerland: "瑞士",
          Taiwan: "台湾",
          tour: "旅游配套",
          travelStartDate: "出发日期",
          travelEndDate: "回程日期",
          Vietnam: "越南"
        }
      }
    }
  },
  computed: {
    ...mapState({
      landingPage: state => state.api.landingPage
    })
  },
  mounted () {
  },
  methods: {
    search (type) {
      // if(this.homeData[`${type}Search`]){
      let startDate = moment(this.homeData[`${type}StartDate`], "YYYY-MM-DD").format("X")
      let endDate = moment(this.homeData[`${type}EndDate`], "YYYY-MM-DD").format("X")
      let routeQuery = {
        keywords: this.homeData[`${type}Search`]
      }
      if (moment(this.homeData[`${type}StartDate`], "YYYY-MM-DD").isValid()) {
        routeQuery.ci = startDate
      }
      if (moment(this.homeData[`${type}EndDate`], "YYYY-MM-DD").isValid()) {
        routeQuery.co = endDate
      }
      this.$router.push({ name: `${this.capitalize(type)}SearchResult`, query: routeQuery })
      // }
      // else{
      //     this.setupSnackbar({
      //         show: true,
      //         text: "Search keyword is required.",
      //         type: 'warning'
      //     });
      // }
    },
    changeTab () {
      // this.$v.$reset()
    },
    datePicked (date, varNameRef, index, id) {
      this.homeData[`${varNameRef}`] = date
      if (varNameRef.indexOf("StartDate") !== -1) {
        this.homeData.hotelEndDate = ""
      }
    },
    hotelDestinationClick (destination) {
      let routeQuery = {
        keywords: destination
      }
      this.$router.push({ name: `HotelSearchResult`, query: routeQuery })
    },
    minDate () {
      let date = new Date()
      return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
    },
    endMinDate (type) {
      let date = new Date()
      date = `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`
      if (this.homeData[`${type}StartDate`]) {
        let endMinDate = new Date(this.homeData[`${type}StartDate`])

        date = `${endMinDate.getFullYear()}-${this.addLeadingZero(endMinDate.getMonth() + 1)}-${this.addLeadingZero(endMinDate.getDate())}`
      }

      return date
    }
  }
}
</script>

<style>

.wrapper-slide {
    width:100% !important;
    height:45vh !important;
    overflow: hidden !important;
}

@media (min-width: 959px)  {
    .wrapper-slide {
        height:80vh !important;
    }
}
</style>
