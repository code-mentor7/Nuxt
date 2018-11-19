import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Customer from "./models"
import randString from "~/util/randString"
import { ServerError } from "express-server-error"
import { pick as _pick, omit as _omit } from "lodash"
import { getSchemaKeys } from "../../common"

export const login = {
  async post (req, res) {
    try {
      let { email, password } = req.body
      let user = await Customer.findOne({ email })
      if (!user) throw new ServerError("Authentication failed. Incorrect email or password", { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)
      if (!user || !matched || !email || !password) {
        throw new ServerError("Authentication failed. Incorrect email or password", { status: 401, log: false })
      }
      else {
        // user = stripUser(user)
        let token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: "30 days", jwtid: randString() })
        res.json({ token })
      }
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}

export const user = {
  async get (req, res) {
    res.json({ user: req.user })
  }
}

export const logout = {
  async post (req, res) {
    res.json({ status: "OK" })
  }
}

export const check = {
  async post (req, res) {
    try {
      if (req.body.email) {
        let cust = await Customer.find({ email: req.body.email })
        console.log("cust.length", cust.length)
        if (cust.length === 0) res.json({ exists: false })
        else throw new ServerError("Email exists", { status: 401, log: false })
      }
      else {
        throw new ServerError("Query not supported.", { status: 400 })
      }
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}

export const signup = {
  async post (req, res) {
    try {
      let allowedSchema = _pick(req.body, getSchemaKeys(Customer))
      let newCustomer = new Customer(allowedSchema)
      let savedCustomer = await newCustomer.save()
      res.json(savedCustomer)
      // throw new ServerError("Query not supported.", { status: 400 })
    }
    catch (error) {
      console.log("catch jere")
      res.handleServerError(error)
    }
  }
}
