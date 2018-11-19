import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { ServerError } from "express-server-error"

// TODO: Customer Roles
// TODO: Email for verify and forget pass

const customerSchema = new mongoose.Schema({
  "name": {
    type: String,
    require: true
  },
  "email": {
    type: String,
    unique: true,
    require: true
  },
  "secondary_email": {
    type: String
  },
  "image_id": {
    type: String
  },
  "contact_number": {
    type: String
  },
  "wishlist": {
    type: Array,
    default: []
  },
  "wishlist.$": {
    type: Object,

    blackbox: true
  },
  "cart": {
    type: Array,
    default: []

  },
  "cart.$": {
    type: Object,

    blackbox: true
  },
  "billing_address": {
    type: Array,
    default: []

  },
  "billing_address.$": {
    type: Object,

    blackbox: true
  },
  "shipping_address": {
    type: Array,
    default: []

  },
  "shipping_address.$": {
    type: Object,

    blackbox: true
  },
  "localeLang": {
    type: String,
    default: "en"
  },
  "wechat_id": {
    type: String,

    default: ""
  },
  "password": {
    type: String,
    require: true,
    minlength: 5
  },
  "email_verified": {
    type: Boolean,
    optional: true,
    default: false
  },
  "verification_token": {
    type: String,
    optional: true
  }
}, {
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
})

customerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

customerSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ServerError("Email already registered.", { status: 409, log: false }))
  }
})

// don't ever return password on creation.
customerSchema.set("toJSON", {
  transform (doc, ret, options) {
    delete ret.password
    return ret
  }
})

const Customer = mongoose.model("Customers", customerSchema)
export default Customer
