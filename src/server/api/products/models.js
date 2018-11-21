import mongoose from "mongoose"

const landingPageSchema = new mongoose.Schema({
  "name": {
    type: String,
    index: 1
  },
  "slug": {
    type: String,
    index: 1,
    optional: true
  },
  "sku": {
    type: String,
    index: 1
  },
  "cost": {
    type: Number,
    optional: true
  },
  "adult_selling_price": {
    type: Number,
    index: 1
  },
  "kid_selling_price": {
    type: Number,
    index: 1
  },
  "adult_promotion_price": {
    type: Number,
    index: 1,
    optional: true
  },
  "kid_promotion_price": {
    type: Number,
    index: 1,
    optional: true
  },
  "promotion_amount": {
    type: Number,
    optional: true
  },
  "promotion_type": {
    type: String,
    optional: true
  },
  "total_reviews": {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  "total_ratings": {
    type: Number,
    defaultValue: 0,
    optional: true
  },
  "inventory": {
    type: Number,
    defaultValue: 0,
    optional: true,
    index: 1
  },
  "description": {
    type: String,
    optional: true,
    defaultValue: ""
  },
  "primary_image_id": {
    type: String,
    optional: true
  },
  "cover_image_id": {
    type: String,
    optional: true
  },
  "other_image_ids": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "other_image_ids.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "address_line_1": { type: String, optional: true },
  "address_line_2": { type: String, optional: true },
  "state": { type: String, optional: true },
  "city": { type: String, optional: true },
  "zip_code": { type: String, optional: true },
  "country": { type: String, optional: true },
  "category": {
    type: String,
    optional: true
  },
  "location_to_be_display": {
    type: String,
    optional: true
  },
  "highlights": {
    type: String,
    optional: true,
    defaultValue: ""
  },
  "includes": {
    type: String,
    optional: true,
    defaultValue: ""
  },
  "duration": {
    type: String,
    optional: true
  },
  "start_date": {
    type: Date,
    optional: true
  },
  "end_date": {
    type: Date,
    optional: true
  },
  "merchant_id": { type: String },
  "merchant_name": { type: String, optional: true },
  "itinerary": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "itinerary.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  // title
  //
  "disabled": {
    type: Boolean,
    optional: true,
    label: "Disabled",
    defaultValue: false
  },
  "notes": {
    type: String,
    optional: true
  },
  "min_pax": {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  "max_pax": {
    type: Number,
    optional: true
  },
  "handling_fee": {
    type: Number,
    optional: true
  },
  "adult_purchase_discount": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "adult_purchase_discount.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "child_purchase_discount": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "child_purchase_discount.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "tour_guide": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "tour_guide.$": {
    type: Object,
    optional: true,
    blackbox: true
  },
  "adult_travel_insurance_fee": {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  "child_travel_insurance_fee": {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  "travel_insurance_file_id": {
    type: String,
    optional: true
  },
  "travel_insurance_fee": {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  "terms_and_conditions": {
    type: String,
    optional: true,
    defaultValue: ""
  },
  "tour_addons_expiration_date": {
    type: Date,
    optional: true
  },
  "lang": {
    type: String,
    autoValue: function () {
      return "english"
    }
  },
  "translation": {
    type: Array,
    defaultValue: [],
    optional: true
  },
  "translation.$": {
    type: Object,
    blackbox: true,
    optional: true
  },
  "translation.$.name": {
    type: String,
    optional: true
  },
  "created_by": {
    type: String,
    optional: true
  },
  "updated_by": {
    type: String,
    optional: true
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }

})

const LandingPage = mongoose.model("products", landingPageSchema, "products")

landingPageSchema.pre("save", function (next) {
  // this._id = this._id.toString()
  next()
})

export default LandingPage