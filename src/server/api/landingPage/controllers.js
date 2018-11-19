import LandingPage from "./models"
import { ServerError } from "express-server-error"

export const index = {
  async get (req, res) {
    let landingPageData = await LandingPage.find({}).catch((err) => {
      console.log("err at find", err)
    })
    if (!landingPageData) throw new ServerError("Passwords don't match.", { status: 400 })
    res.json(landingPageData)
    // try {
    //   let users = await User.find({})
    //   if (!users) throw new ServerError('No users exist at this moment.', { status: 404 })
    //   res.json(users)
    // } catch (error) {
    //   res.handleServerError(error)
    // }
  }
}
