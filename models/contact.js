const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { mongooseErrorStatus } = require('../utils');

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Set name for contact'],
	},
	email: {
		type: String,
		required: true,
		match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	},
	phone: {
		type: String,
		required: true,
		match: /^\(\d{3}\)\s\d{3}-\d{4}$/, 
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

const patchSchema = Joi.object({
	favorite: Joi.bool().required(),
})

const schemas = {
	postSchema,
	putSchema,
	patchSchema,
}

module.exports = {
	Contact,
	schemas,
}