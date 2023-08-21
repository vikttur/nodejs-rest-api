const { Contact } = require('../models/contact');
const { HttpError, ctrlWrap } = require('../utils');
const { schemas } = require('../models/contact');

const getAll = async (req, res) => {
	const { _id: owner } = req.user; 
	const { page = 1, limit = 20, ...filters } = req.query;
	const skip = (page - 1) * limit;

	const listContacts = await Contact.find({ owner, ...filters }, '-owner -token -createdAt -updatedAt', { skip, limit });
	res.json(listContacts);
}

const getById = async (req, res) => {
	const { _id: owner } = req.user;
	const { id } = req.params;

  const contact = await Contact.findOne({ _id: id, owner, }, '-token -createdAt -updatedAt');
  if (!contact) throw HttpError(404);
      
	res.json(contact);
}

const postAdd = async (req, res) => {
	const { error } = schemas.postSchema.validate(req.body);
	if (error) throw HttpError(400, "missing required name field");

	const { _id: owner } = req.user;
	const addContact = await Contact.create({ ...req.body, owner });
	res.status(201).json(addContact);
}

const updateById = async (req, res) => {
	const { error } = schemas.putSchema.validate(req.body);
	if (error) throw HttpError(400, 'missing fields');

	const { _id: owner } = req.user;
	const { id } = req.params;
	const updateContact = await Contact.findOneAndUpdate({ _id: id, owner, }, req.body, { new: true, });
	if (!updateContact) throw HttpError(404);
	res.json(updateContact);
}

const updateStatusContact = async (req, res) => {
	const { error } = schemas.patchSchema.validate(req.body);
	if (error) throw HttpError(400, 'missing field favorite');

	const { _id: owner } = req.user;
	const { id } = req.params;
	const updateContact = await Contact.findOneAndUpdate({ _id: id, owner, }, req.body, {now: true, });
	if (!updateContact) throw HttpError(404);
	res.json(updateContact);
}

const deleteById = async (req, res) => {
	const { _id: owner } = req.user;
	const { id } = req.params;
	const deletedContact = await Contact.findOneAndDelete({ _id: id, owner, });

	if (!deletedContact) throw HttpError(404);
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