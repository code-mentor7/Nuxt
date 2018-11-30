import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"
import jwt from "express-jwt"

const router = Router()

router.use(jwt({ secret: process.env.SECRET }))

router.route("/")
  .put(controllers.updateOne)
// router.put("/", jwt({ secret: process.env.SECRET }), controllers.updateOne)

export default router
