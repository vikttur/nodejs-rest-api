const Joi = require('joi');
const { Contact } = require('../models/contact');
const { HttpError, ctrlWrap } = require('../utils');

const postSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
})

const putSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
})

const getAll = async (req, res) => {
	const listContacts = await Contact.find();
	res.json(listContacts);
}

// const getById = async (req, res) => {
// 		const { id } = req.params;
// 		const getContact = await contacts.getById(id);

// 		if (!getContact) throw HttpError(404, 'Not found');
// 		res.json(getContact);
// }

// const postAdd = async (req, res) => {
// 	const { error } = postSchema.validate(req.body);
// 	if (error) throw HttpError(400, "missing required name field");

// 	const addContact = await contacts.addContact(req.body);
// 	res.status(201).json(addContact);
// }

// const updateById = async (req, res) => {
// 	const { error } = putSchema.validate(req.body);
// 	if (error) throw HttpError(400, 'missing fields');

// 	const { id } = req.params;
// 	const updateContact = await contacts.updateContact(id, req.body);
// 	if (!updateContact) throw HttpError(404, 'Not found');
// 	res.json(updateContact);
// }

// const deleteById = async (req, res) => {
// 	const { id } = req.params;
// 	const deletedContact = await contacts.removeContact(id);
// 	if (!deletedContact) throw HttpError(404, 'Not found');
// 	res.json({ "message": "contact deleted" });
// }
	
module.exports = {
	getAll: ctrlWrap(getAll),
	// getById: ctrlWrap(getById),
	// postAdd: ctrlWrap(postAdd),
	// updateById: ctrlWrap(updateById),
	// deleteById: ctrlWrap(deleteById), 
}