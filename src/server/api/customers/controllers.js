import { cloudinaryRemoveSingleFileWithPublicId, cloudinaryUploadSingleFileWithBuffer } from "../../common/cloudinary"
import { generateControllers } from "../../common/query"
import { pick as _pick } from "lodash"
import Customer from "./models"
import { ServerError } from "express-server-error"

const updateOneById = async (req, res, next) => {
  if (!req.params.id) throw new ServerError("Id not found.", { status: 400 })
  let allowedSchema = _pick(req.body, ["name", "contact_number", "wechat_id", "localeLang"])

  try {
    if (req.file) {
      if (req.file.mimetype.indexOf("image") !== -1 || req.file.mimetype.indexOf("pdf") !== -1) {
        const cloudinaryImgObj = await cloudinaryUploadSingleFileWithBuffer(req.file)
        allowedSchema.image_id = cloudinaryImgObj.public_id
        if (req.body.old_image_id) {
          // remove old profile pic, dont need to wait for result
          cloudinaryRemoveSingleFileWithPublicId(req.body.old_image_id)
            .catch()
        }
      }
    }
    const findQuery = { _id: req.params.id }
    const updateQuery = { $set: { ...allowedSchema } }
    await Customer.updateOne(findQuery, updateQuery)
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

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

  try {
    let updateQuery = { $pull: { cart: { product_id: req.body.product_id } } }
    let findQuery = { _id: req.user._id }
    await Customer.update(
      findQuery,
      updateQuery,
      { safe: true, multi: true }
    )
    res.send("done")
  }
  catch (err) {
    res.handleServerError(err)
  }
}

export default generateControllers(Customer, {
  deleteOneCart: deleteOneCart,
  updateOneById: updateOneById,
  updateOneCart: updateOneCart
})
