const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

//@desc GET all contact
//@route GET /api/contacts
//@access pulic
const getContact = asyncHandler(async (request, response) => {
  const contactList = await Contact.find({});
  // console.log("Contact List --> ", contactList);
  response.status(200).send({ message: "Get all contacts", data: contactList });
});

//@desc POST New contact
//@route POST /api/contacts
//@access pulic
const createContact = asyncHandler(async (request, response) => {
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    response.status(400);
    throw new Error("All fields are mandatory");
    // response.status(400).send({ message: "All field are required" });
  }
  const contact = await Contact.create({ name, email, phone });
  response.status(201).send({ message: "Contact created", data: contact });
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access pulic
const getSingleContact = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const contactDetails = await Contact.findById(id);
  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }
  response.status(200).send({
    message: `Single contact is get ${request.params.id}`,
    data: contactDetails,
  });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access pulic
const updateContact = asyncHandler(async (request, response) => {
  // console.log("Update API --> ", request.body);

  const { id } = request.params;
  const contactDetails = await Contact.findById(id);
  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }

  const updateContact = await Contact.findByIdAndUpdate(id, request.body, {
    new: true,
  });

  response.status(200).send({
    message: `Update contact of id is  ${request.params.id}`,
    data: updateContact,
  });
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access pulic
const deleteContact = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const contactDetails = await Contact.findByIdAndDelete(id);

  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }

  response.status(200).send({
    message: `Deleted contact is ${request.params.id}`,
    data: contactDetails,
  });
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
