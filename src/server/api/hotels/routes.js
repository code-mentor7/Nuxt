import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"

const router = Router()

// router.param("id", controllers.findByParam)

// router.get("/", controllers.getAll)

router.route("/")
  .post(controllers.textSearch)

// router.route("/slug/:slug")
//   .post(controllers.findByQuery)

// router.route("/slug/:slug")
//   .post(function (req, res) {
//     console.log("### controllers.findByQuery", controllers.findByQuery)
//     console.log("### controllers.textSearch", controllers.textSearch)
//     res.json("heyy")
//   })

router.route("/count")
  .post(controllers.textSearchCount)

export default router
