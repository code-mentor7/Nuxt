import mongoose from "mongoose"

const landingPageSchema = new mongoose.Schema({
  "created_at": {
    type: Date,
    label: "Created At",
    autoValue () {
      return new Date()
    }
  },
  "updated_at": {
    type: Date,
    label: "Updated At",
    autoValue () {
      return new Date()
    }
  },
  "main_carousel": {
    type: Array,
    optional: true,
    label: "Main Carousel",
    defaultValue: []
  },
  "main_carousel.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "section_title_1": { type: String, optional: true },
  "section_sub_title_1": { type: String, optional: true },
  "section_sub_title_2": { type: String, optional: true },
  "hotel_destination_1": {
    type: Array,
    optional: true,
    label: "hotel destination 1",
    defaultValue: []
  },
  "hotel_destination_1.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "hotel_destination_2": {
    type: Array,
    optional: true,
    label: "hotel destination 2",
    defaultValue: []
  },
  "hotel_destination_2.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "section_text_1_disabled": {
    type: Boolean,
    optional: true,
    label: "Disabled",
    defaultValue: false
  },
  "section_text_1_title": { type: String, optional: true },
  "section_text_1_content": { type: String, optional: true },
  "section_text_2_disabled": {
    type: Boolean,
    optional: true,
    label: "Disabled",
    defaultValue: false
  },
  "section_text_2_title": { type: String, optional: true },
  "section_text_2_content": { type: String, optional: true },
  "updated_by": {
    type: String,
    optional: true
  }
}, {
  timestamps: true
})

const LandingPage = mongoose.model("LandingPage", landingPageSchema, "landing_page")

// don't ever return password on creation.
landingPageSchema.set("toJSON", {
  transform (doc, ret, options) {
    // delete ret.password
    return ret
  }
})

export default LandingPage
