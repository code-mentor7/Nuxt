<template>
  <v-dialog
    ref="datePickerDialog"
    v-model="datePickerDialog"
    :return-value.sync="pickedDate"
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="pickedDate"
      :label="label"
      append-icon="event"
      readonly
    />
    <v-date-picker
      v-model="pickedDate"
      :show-current="false"
      :min="localMin"
      :max="max"
      color="black"
      scrollable>
      <v-spacer/>
      <v-btn
        flat
        color="primary"
        @click="datePickerDialog = false">Cancel</v-btn>
      <v-btn
        flat
        color="primary"
        @click="picked">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: { type: String },
    initialDate: { type: String },
    index: { type: String },
    label: {
      type: String,
      required: true
    },
    max: {
      type: String,
      default: ""
    },
    min: {
      type: String,
      default: ""
    },
    varNameRef: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      datePickerDialog: false,
      pickedDate: this.initialDate || "",
      localMin: this.min
    }
  },
  watch: {
    min (val) {
      if (val) {
        this.localMin = val
        if (this.pickedDate) {
          try {
            if (new Date(this.pickedDate) < new Date(this.localMin)) {
              this.pickedDate = ""
            }
          }
          catch (err) {
            console.warn("is not Date.")
            this.pickedDate = ""
          }
        }
      }
    },
    initialDate (val) {
      this.pickedDate = val
    }
  },
  methods: {
    picked () {
      this.$refs.datePickerDialog.save(this.pickedDate)
      this.$emit("input", this.pickedDate)
      this.$emit("picked", this.pickedDate, this.varNameRef, this.index, this.id)
    }
  }
}
</script>

<style>

</style>
