const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");

//@desc GET all contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (request, response) => {
  console.log("request.user.id --> ", request);
  const contactList = await Contact.find({ user_id: request.user.id });
  // console.log("Contact List --> ", contactList);
  response.status(200).send({ message: "Get all contacts", data: contactList });
});

//@desc POST New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (request, response) => {
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    response.status(400);
    throw new Error("All fields are mandatory");
    // response.status(400).send({ message: "All field are required" });
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: request.user.id,
  });
  response.status(201).send({ message: "Contact created", data: contact });
});

//@desc Get single contact
//@route GET /api/contacts/:id
//@access private
const getSingleContact = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const contactDetails = await Contact.findById(id);
  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }

  if (request.user.id && contactDetails.user_id !== request.user.id) {
    response.status(403);
    throw new Error("User don't have permission to see other user contacts");
  }

  response.status(200).send({
    message: `Single contact is get ${request.params.id}`,
    data: contactDetails,
  });
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (request, response) => {
  // console.log("Update API --> ", request.body);

  const { id } = request.params;
  const contactDetails = await Contact.findById(id);
  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }

  if (contactDetails.user_id !== request.user.id) {
    response.status(403);
    throw new Error("User don't have permission to update other user contacts");
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
//@access private
const deleteContact = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const contactDetails = await Contact.findById(id);

  if (!contactDetails) {
    response.status(404);
    throw new Error("Contact not found");
  }

  if (contactDetails.user_id !== request.user.id) {
    response.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }

  await Contact.deleteOne({ _id: request.params.id });

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
