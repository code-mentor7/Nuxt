import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"

const router = Router()

router.route("/")
  .post(controllers.textSearch)

router.route("/count")
  .post(controllers.textSearchCount)

export default router
