<template>
  <v-container
    grid-list-xl
    fluid >
    <v-layout wrap >
      <v-flex
        :md6="!isSmallSize"
        xs12
        class="py-0">
        <v-text-field
          v-model.number="adult_quantity"
          outline
          single-line
          placeholder="3"
          suffix="Adult"
          class="justify-center"
          readonly
          type="number">
          <v-icon
            v-ripple
            slot="append"
            color="success"
            @click.prevent.stop="quantityAdd('adult')">add_circle</v-icon>
          <v-icon
            v-ripple
            slot="prepend-inner"
            color="amber accent-4"
            @click.prevent.stop="quantityMinus('adult')" >remove_circle</v-icon>
            <!-- <v-btn color="success" small flat icon
                        slot="append"
                        @click.prevent.stop="quantityAdd('adult')">
                        <v-icon>add</v-icon>
                    </v-btn>
                    <v-btn color="warning" small flat icon
                    slot="prepend-inner"
                    @click.prevent.stop="quantityMinus('adult')">
                        <v-icon>remove</v-icon>
                    </v-btn> -->
        </v-text-field>
      </v-flex>
      <v-flex
        :md6="!isSmallSize"
        xs12
        class="py-0">
        <v-text-field
          v-model="child_quantity"
          outline
          single-line
          placeholder="3"
          suffix="Child"
          type="number"
          readonly>
          <v-icon
            v-ripple
            slot="append"
            color="success"
            @click.prevent.stop="quantityAdd('child')" >add_circle</v-icon>
          <v-icon
            v-ripple
            slot="prepend-inner"
            color="amber accent-4"
            @click.prevent.stop="quantityMinus('child')" >remove_circle</v-icon>
        </v-text-field>
      </v-flex>
      <v-flex
        :md4="!isSmallSize"
        xs12
        class="py-0">
        <v-checkbox
          v-model="is_insurance"
          class="py-0 my-0"
          color="primary"
          @change="clickInsurance()"
        >
          <span slot="label">
            <a
              v-if="travel_insurance_file_id"
              :href="travel_insurance_file_id | cloudinaryImageUrl"
              target="_blank"
              @click.stop>
              Travel Insurance
            </a>
            <span v-else>Travel Insurance</span>
          </span>
        </v-checkbox>
      </v-flex>
      <v-flex
        :md4="!isSmallSize"
        xs12
        class="py-0">
        Adult insurance fee: MYR {{ adultInsuranceFee }}
      </v-flex>
      <v-flex
        :md4="!isSmallSize"
        :class="{'pb-3': tour_guide.length === 0}"
        xs12
        class="py-0">
        Child insurance fee: MYR {{ childInsuranceFee }}
      </v-flex>
      <v-flex
        v-if="tour_guide.length > 0"
        xs12
        class="py-0">
        <v-subheader
          class="py-0 px-0 black--text"
          style="text-decoration: underline;"
        >
          Speaking Guide Extra Charge
        </v-subheader>
        <v-radio-group
          v-model="selectedGuide"
          :mandatory="false"
          class="py-0 my-0">
          <v-radio
            v-for="(value, i) in tour_guide"
            :key="i"
            :label="value.tour_guide_name"
            :value="i"
            color="primary"
            @mouseup.native="allowUncheck(i)">
            <span slot="label">{{ value.tour_guide_name }}&emsp;  <span>MYR {{ value.tour_guide_price }}</span> </span>
          </v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    adultInsuranceFee: {
      type: Number,
      default: 0
    },
    childInsuranceFee: {
      type: Number,
      default: 0
    },
    isInsurance: {
      type: Boolean,
      default: true
    },
    insuranceFile: {
      default: null
    },
    isSmallSize: {
      type: Boolean,
      default: false
    },
    originAdultQty: {
      type: Number,
      default: 0
    },
    originChildQty: {
      type: Number,
      default: 0
    },
    startingAdultQty: {
      type: Number,
      default: 0
    },
    startingChildQty: {
      type: Number,
      default: 0
    },
    tourGuide: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      adult_quantity: this.startingAdultQty,
      child_quantity: this.startingChildQty,
      origin_adult_quantity: this.originAdultQty,
      origin_child_quantity: this.originChildQty,
      adult_travel_insurance_fee: this.adultInsuranceFee,
      child_travel_insurance_fee: this.childInsuranceFee,
      travel_insurance_file_id: this.insuranceFile,
      tour_guide: this.tourGuide,
      is_insurance: this.isInsurance,
      selectedGuide: false
    }
  },
  watch: {
    startingAdultQty (val) {
      if (val) {
        this.adult_quantity = val
      }
    },
    startingChildQty (val) {
      if (val) {
        this.child_quantity = val
      }
    },
    originAdultQty (val) {
      if (val) {
        this.origin_adult_quantity = val
      }
    },
    originChildQty (val) {
      if (val) {
        this.origin_child_quantity = val
      }
    },
    adultInsuranceFee (val) {
      if (val) {
        this.adult_travel_insurance_fee = val
      }
    },
    childInsuranceFee (val) {
      if (val) {
        this.child_travel_insurance_fee = val
      }
    },
    insuranceFile (val) {
      if (val) {
        this.travel_insurance_file_id = val
      }
    },
    tourGuide (val) {
      if (val) {
        this.tour_guide = val
      }
    },
    isInsurance (val) {
      if (val) {
        this.is_insurance = val
      }
    }

  },
  methods: {
    allowUncheck (value) {
      if (value === this.selectedGuide) {
        // Issue on deselect radio  https://github.com/vuetifyjs/vuetify/issues/4676
        this.$nextTick(() => {
          this.selectedGuide = false
        })
      }
      this.$nextTick(() => {
        this.$emit("inputControlData", this.$data)
      })
    },
    quantityAdd (type) {
      this[`${type}_quantity`] += 1
      this.$emit("inputControlData", this.$data)
    },
    quantityMinus (type) {
      if (this[`${type}_quantity`] > this[`origin_${type}_quantity`]) {
        this[`${type}_quantity`] -= 1
        this.$emit("inputControlData", this.$data)
      }
    },
    clickInsurance () {
      this.$emit("inputControlData", this.$data)
    }
  }

}
</script>

<style>

</style>
