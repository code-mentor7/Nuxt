import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "./models"
import randString from "~/util/randString"
import { ServerError } from "express-server-error"

export const login = {
  async post (req, res) {
    console.log("process.env.SECRET", process.env.SECRET)
    try {
      let { email, password } = req.body
      let user = await User.findOne({ email })
      if (!user) throw new ServerError("Authentication failed. Incorrect email or password", { status: 401, log: false })
      let passwordHash = user.password
      let matched = await bcrypt.compare(password, passwordHash)
      if (!user || !matched || !email || !password) {
        throw new ServerError("Authentication failed. Incorrect email or password", { status: 401, log: false })
      } else {
        // user = stripUser(user)
        let token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: "30 days", jwtid: randString() })
        res.json({ token })
      }
    } catch (error) {
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
