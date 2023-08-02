const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const { HttpError } = require('../../utils');

const router = express.Router();

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
	try {
		const listContacts = await contacts.listContacts();
		res.json(listContacts);
	}
	catch (error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const getContact = await contacts.getById(id);

		if (!getContact) throw HttpError(404, 'Not found');
		res.json(getContact);
	}
	catch (error) { next(error) }
})

router.post('/', async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) throw HttpError(400, "missing required name field");

		const addContact = await contacts.addContact(req.body);
		res.status(201).json(addContact);
	}
	catch (error) { next(error) }
})

router.put('/:id', async (req, res, next) => {
		try {
		const { error } = addSchema.validate(req.body);
		if (error) throw HttpError(400, 'missing fields');

		const { id } = req.params;
		const updateContact = await contacts.updateContact(id, req.body);
		if (!updateContact) throw HttpError(404, 'Not found');
		res.json(updateContact);
	}
	catch (error) { next(error) }
})

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedContact = await contacts.removeContact(id);
		if (!deletedContact) throw HttpError(404, 'Not found');
		res.json({ "message": "contact deleted" });
	}
	catch (error) {
		next(error)
	}
})

module.exports = router
