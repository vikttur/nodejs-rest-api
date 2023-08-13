const { Contact } = require('../models/contact');
const { HttpError, ctrlWrap } = require('../utils');
const { schemas } = require('../models/contact');

const getAll = async (req, res) => {
	const listContacts = await Contact.find();
	res.json(listContacts);
}

const getById = async (req, res) => {
		const { id } = req.params;
	const getContact = await Contact.findById(id);

		if (!getContact) throw HttpError(404, 'Not found');
		res.json(getContact);
}

const postAdd = async (req, res) => {
	const { error } = schemas.postSchema.validate(req.body);
	if (error) throw HttpError(400, "missing required name field");

	const addContact = await Contact.create(req.body);
	res.status(201).json(addContact);
}

const updateById = async (req, res) => {
	const { error } = schemas.putSchema.validate(req.body);
	if (error) throw HttpError(400, 'missing fields');

	const { id } = req.params;
	const updateContact = await Contact.findByIdAndUpdate(id, req.body, {now: true});
	if (!updateContact) throw HttpError(404, 'Not found');
	res.json(updateContact);
}

const updateStatusContact = async (req, res) => {
	const { error } = schemas.patchSchema.validate(req.body);
	if (error) throw HttpError(400, 'missing field favorite');

	const { id } = req.params;
	const updateContact = await Contact.findByIdAndUpdate(id, req.body, {now: true});
	if (!updateContact) throw HttpError(404, 'Not found');
	res.json(updateContact);
}

const deleteById = async (req, res) => {
	const { id } = req.params;
	const deletedContact = await Contact.findByIdAndDelete(id);
	if (!deletedContact) throw HttpError(404, 'Not found');
	res.json({ "message": "contact deleted" });
}
	
module.exports = {
	getAll: ctrlWrap(getAll),
	getById: ctrlWrap(getById),
	postAdd: ctrlWrap(postAdd),
	updateById: ctrlWrap(updateById),
	updateStatusContact: ctrlWrap(updateStatusContact),
	deleteById: ctrlWrap(deleteById), 
}