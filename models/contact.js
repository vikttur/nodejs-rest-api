const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { mongooseErrorStatus } = require('../utils');

const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const regexpPhone = /^\(\d{3}\)\s\d{3}-\d{4}$/ //(000) 000-0000

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: regexpEmail,
	},
	phone: {
		type: String,
		required: true,
		match: regexpPhone,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
}, {versionKey: false, timestamps: true})

contactSchema.post('save', mongooseErrorStatus);

const Contact = model('contact', contactSchema);

const postSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
})

const putSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.bool(),
})

const schemas = {
	postSchema,
	putSchema,
}

module.exports = {
	Contact,
	schemas,
}