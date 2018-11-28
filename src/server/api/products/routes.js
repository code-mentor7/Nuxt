import { Router } from "express"
// import authenticate from '~/middleware/authenticate'
import controllers from "./controllers"

const router = Router()

// router.param("id", controllers.findByParam)

// router.get("/", controllers.getAll)

router.route("/")
  .post(controllers.textSearch)

router.route("/count")
  .post(controllers.textSearchCount)

router.route("/:id")
  .get(function (req, res) {
    // var mongoose = require('mongoose')
    // var id = mongoose.Types.ObjectId()
    // console.log("id", id)
  //   LandingPage.update({ _id: "n2jbrWiu8diyczHFH" }, {
  //     _id: id
  // }, function(err, numberAffected, rawResponse) {
  //   console.log("###1 ", err)
  //   console.log("###2 ", numberAffected)
  //   console.log("###3 ", err)
  //    //handle it
  // })
    // let asd = LandingPage.find({  })
    //   .then((qwe) => {
    //     // _id: "n2jbrWiu8diyczHFH"
    //     console.log("then")
    //     qwe
    //   .forEach(async function (d) {
    //     let qwe = d.toObject()
    //     // if(d._id == "n2jbrWiu8diyczHFH"){
    //     //     let mongoose = require('mongoose')
    //     // let id = mongoose.Types.ObjectId()
    //     // console.log(id)

    //     // var id = ObjectId(d._id); //_id to ObjectId
    //     // var oldId = d._id; // _id
    //     delete qwe._id
    //     let newCustomer = new LandingPage(qwe)
    //     await newCustomer.save()
    //     // await LandingPage.create(qwe, function (err, small) {
    //     //   console.log(err)
    //     //   // if (err) return handleError(err);
    //     //   // saved!
    //     // });
    //     console.log('after')
    //     // LandingPage.create(d, function (err, small) {
    //     //   console.log("##$#$#err here", err)
    //     //   // if (err) return handleError(err);
    //     //   // saved!
    //     // });
    //     // LandingPage.save(d); // clone doc with new Id
    //     // d.remove(); // delete old doc
    //     // }

    //   })

    //   })
    //   .catch(() => {
    //     console.log("err here")
    //   })

    // console.log(qwe, qwe.length)

    // console.log(qwe)
    res.json("heyy")
  })

export default router
