import { generateControllers } from "../../common/query"
import Customer from "./models"

const updateOne = (req, res, next) => {
  console.log("### req.body dude", req.body)
  console.log("### user", req.user)
  res.send("heyy")
}

export default generateControllers(Customer, {
  updateOne: updateOne
})
