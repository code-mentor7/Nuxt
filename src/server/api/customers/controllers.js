import { generateControllers } from "../../common/query"
import Customer from "./models"
import { ServerError } from "express-server-error"

const updateOneCart = async (req, res, next) => {
  if (!req.user) throw new ServerError("User not found.", { status: 400 })
  let isInCart = false
  req.user.cart.forEach(function (_cart) {
    if (req.body.product_id === _cart.product_id._id) {
      isInCart = true
    }
  })

  try {
    let updateQuery = { $push: { cart: req.body } }
    let findQuery = { _id: req.user._id }
    if (isInCart) {
      updateQuery = { $set: { "cart.$": req.body } }
      findQuery = { "_id": req.user._id, "cart.product_id": req.body.product_id }
    }
    await Customer.updateOne(
      findQuery,
      updateQuery
    )
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

const deleteOneCart = async (req, res, next) => {
  if (!req.user) throw new ServerError("User not found.", { status: 400 })
  console.log("### ", req.body.product_id)

  try {
    let updateQuery = { $pull: { cart: { product_id: req.body.product_id } } }
    let findQuery = { _id: req.user._id }
    const qwe = await Customer.update(
      findQuery,
      updateQuery,
      { safe: true, multi: true }
    )
    console.log("### ", qwe)
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

export default generateControllers(Customer, {
  deleteOneCart: deleteOneCart,
  updateOneCart: updateOneCart
})
