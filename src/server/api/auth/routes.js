import { Router } from "express"
import { login, user, logout, check, signup } from "./controllers"

const jwt = require("express-jwt")

const router = Router()

router.post("/login", login.post)
router.post("/logout", jwt({ secret: process.env.SECRET }), logout.post)

router.post("/signup", signup.post)

router.get("/user", jwt({ secret: process.env.SECRET }), user.get)

router.post("/user/check", check.post)

// router.get('/check', check.get)

// router.post('/sign-in', signIn.post)
// router.post('/sign-out', authenticate(), signOut.post)

// router.route('/:username')
//   .all(authenticate())
//   .get(username.get)
//   .post(username.post)
//   .delete(username.delete)

export default router
