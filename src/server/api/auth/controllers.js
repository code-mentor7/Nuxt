import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Customer from "./models"
import randString from "~/util/randString"
import { ServerError } from "express-server-error"
import { pick as _pick } from "lodash"
import { generateEmailHTMLButtonTemplate, generateToken, getSchemaKeys, sendEmail } from "../../common"
import moment from "moment"

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
        const userObj = user.toObject()
        if (userObj.account_verified !== true) {
          throw new ServerError("Account not verified.", { status: 403, log: false })
        }
        let token = jwt.sign(userObj, process.env.SECRET, { expiresIn: "30 days", jwtid: randString() })
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

export const resendVE = {
  async post (req, res) {
    try {
      const allowedData = _pick(req.body, ["email"])
      if (!allowedData.email) {
        throw new ServerError("Email is required.", { status: 400 })
      }
      let cust = await Customer.findOne({ email: allowedData.email })
      if (!cust) throw new ServerError("Email not found.", { status: 400 })

      if (cust.account_verified === true) {
        throw new ServerError("Account already verified.", { status: 403 })
      }

      const signature = {
        email: cust.email,
        contact_number: cust.contact_number
      }

      cust.verification_token = generateToken(signature)

      await cust.save()
      const verificationLink = `${req.protocol}://${req.get("host")}/verify?i=${cust.verification_token}`
      const emailHTML = generateEmailHTMLButtonTemplate(
        verificationLink,
        "Email Verification",
        "Verify your email to complete your signup",
        "Click Me"
      )
      await sendEmail(cust.email, "[96travel] Verify Your Signup", emailHTML)
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const resetPass = {
  // TODO: reset successfull should refresh attempt count
  async post (req, res) {
    try {
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const forgotPass = {
  async post (req, res) {
    try {
      const allowedData = _pick(req.body, ["email"])
      if (!allowedData.email) {
        throw new ServerError("Email is required.", { status: 400 })
      }
      let cust = await Customer.findOne({ email: allowedData.email })
      if (!cust) throw new ServerError("Email not found.", { status: 400 })

      if (cust.account_verified === false) {
        throw new ServerError("Please verify your account.", { status: 403 })
      }
      if (cust.reset_password_attempt > 2) {
        throw new ServerError("short and stout", { status: 418 })
      }

      const signature = {
        email: cust.email,
        contact_number: cust.contact_number
      }

      cust.reset_password_token = generateToken(signature)
      cust.reset_password_attempt += 1
      cust.reset_password_attempt_at = new Date()

      await cust.save()
      const resetLink = `${req.protocol}://${req.get("host")}/reset-password?i=${cust.reset_password_token}`
      const emailHTML = generateEmailHTMLButtonTemplate(
        resetLink,
        "Reset Password",
        "Click the button to reset your password",
        "Click Me"
      )
      await sendEmail(cust.email, "[96travel] Reset Password", emailHTML)
      res.json({ status: "OK" })
    }
    catch (err) {
      res.handleServerError(err)
    }
  }
}

export const signup = {
  async post (req, res) {
    try {
      const allowedSchema = _pick(req.body, getSchemaKeys(Customer))
      const signature = {
        email: allowedSchema.email,
        contact_number: allowedSchema.contact_number
      }

      allowedSchema.verification_token = generateToken(signature)
      // unique is an index configuration option in your schema.
      // If your 'users' collection doesn't have a unique index on userName,
      // you need to wait for the index to build before you start relying on it.
      // https://github.com/Automattic/mongoose/issues/5050
      await Customer.init()
      // let newCustomer = new Customer(allowedSchema)
      // await newCustomer.save()
      await Customer.create(allowedSchema)
      const verificationLink = `${req.protocol}://${req.get("host")}/verify?i=${allowedSchema.verification_token}`
      const emailHTML = generateEmailHTMLButtonTemplate(
        verificationLink,
        "Email Verification",
        "Verify your email to complete your signup",
        "Click Me"
      )
      await sendEmail(allowedSchema.email, "[96travel] Verify Your Signup", emailHTML)
      res.json({ status: "OK" })
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}

export const verify = {
  async post (req, res) {
    try {
      let decodedData = jwt.verify(req.body.i, process.env.SECRET)
      if (decodedData.email === undefined) {
        throw new ServerError("Email not found.", { status: 400 })
      }

      let unixNow = moment().unix()
      if (decodedData.exp) {
        if (unixNow > decodedData.exp) {
          throw new ServerError("Token Expired.", { status: 401 })
        }
      }

      let cust = await Customer.findOne({ email: decodedData.email })

      if (!cust) throw new ServerError("Email not found.", { status: 400 })

      if (cust.account_verified === true) {
        throw new ServerError("Account already verified.", { status: 403 })
      }
      cust.verified_at = new Date()
      cust.account_verified = true
      cust.verified_via = "email"
      cust.verification_token = ""
      await cust.save()
      res.json({ status: "OK" })
    }
    catch (error) {
      res.handleServerError(error)
    }
  }
}
