const asyncHandler = require("express-async-handler") //async handler will automatically catch whenever a exception is occured is going to pass to asynHandler
const Contact = require("../models/contactModels")

// desc Get all contacts
// @route Get /api/contacts
// @access public

const getContacts = asyncHandler(async(req , res)=> {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
})

// desc Create New contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async(req , res)=> {
    console.log( "The request body is",req.body)
    const {name , email, phone} = req.body
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All fields are mandotry")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json({contact })
})

// desc  Get contacts
// @route Get /api/contacts/:id
// @access public
const getContact = asyncHandler(async(req , res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

// desc Update contacts
// @route Put /api/contacts/:id
// @access public
const updateContacts = asyncHandler(async(req , res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    const updatedContacts = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    )
    res.status(200).json(updatedContacts)
})

// desc Delete contacts
// @route delete /api/contacts/:id
// @access public
const deleteContacts = asyncHandler(async(req , res)=> {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")
    }

    await Contact.remove();
    res.status(200).json(contact)
})          

module.exports = { getContacts, createContact , getContact, updateContacts, deleteContacts}