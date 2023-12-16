//@desc GET all contact
//@route GET /api/contacts
//@access pulic
const getContact = (request, response) => {
  response.status(200).send({ message: "Gel all contacts" });
};

//@desc POST New contact
//@route POST /api/contacts
//@access pulic
const createContact = (request, response) => {
  console.log("Create API ---=> ", request);
  response.status(201).send({ message: "Contact created", data: request.body });
};

//@desc Get single contact
//@route GET /api/contacts/:id
//@access pulic
const getSingleContact = (request, response) => {
  response
    .status(200)
    .send({ message: `Single contact is get ${request.params.id}` });
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access pulic
const updateContact = (request, response) => {
  console.log("Update API --> ", request.body);
  response
    .status(200)
    .send({ message: `Update contact of id is  ${request.params.id}` });
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access pulic
const deleteContact = (request, response) => {
  response
    .status(200)
    .send({ message: `Deleted contact is ${request.params.id}` });
};

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
