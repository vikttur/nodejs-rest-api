const Joi = require('joi');
const { Schema, model } = require('mongoose');
const { EMAIL_REGEXP, SUBSCRIPTIONS, mongooseErrorStatus } = require('../utils');

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		match: EMAIL_REGEXP,
		required: [true, 'Email is required'],
	},
	password: {
		type: String,
		minlength: 8,
		required: [true, 'Set password for user'],
	},
	subscription: {
		type: String,
		default: 'starter',
    enum: SUBSCRIPTIONS, 
  },
	token: {
		type: String,
		default: '',
	}
}, { versionKey: false, timestamps: true });

userSchema.post('save', mongooseErrorStatus);

const User = model('user', userSchema);

const signapSchema = Joi.object({
	email: Joi.string().pattern(EMAIL_REGEXP).required(),
	password: Joi.string().min(8).required(),
})

const schemas = {
	signapSchema,
}

module.exports = {
	User,
	schemas,
}