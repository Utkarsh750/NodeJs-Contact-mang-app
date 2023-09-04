const express = require("express")
const router = express.Router()
const {getContacts , createContact, getContact , updateContacts , deleteContacts } = require("../controllers/contactControllers")

router.route("/").get (getContacts)

router.route("/").post (createContact)

router.route("/:id").put (updateContacts)

router.route("/:id").get (getContact)


router.route("/:id").delete (deleteContacts)

module.exports = router