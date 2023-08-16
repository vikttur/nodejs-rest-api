const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { EMAIL_REGEXP, mongooseErrorStatus } = require('../utils');

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Set name for contact'],
	},
	email: {
		type: String,
		unique: true,
		match: EMAIL_REGEXP,
		required: true,
	},
	password: {
		type: String,
		minlength: 8,
		required: true,
	},
}, { versionKey: false, timestamps: true });

userSchema.post('save', mongooseErrorStatus);

const User = model('user', userSchema);

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(8).required(),
})

const loginSchema = Joi.object({
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(8).required(),
})

const schemas = {
	registerSchema,
	loginSchema,
}

module.exports = {
	User,
	schemas,
}