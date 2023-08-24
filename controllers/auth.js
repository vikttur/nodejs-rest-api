const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { User, schemas} = require('../models/user');
const { SUBSCRIPTIONS, HttpError, ctrlWrap } = require('../utils');

const { SECRET_KEY } = process.env;
const avatarDir = path.join(__dirname, '..', 'public', 'avatars');

const register = async (req, res) => {
	const { error } = schemas.signapSchema.validate(req.body);
	if (error) throw HttpError(400, 'Error from Joi or other validation library');

	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, 'Email is already in use');

	const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email);
	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	})
}

const login = async (req, res) => {
	const { error } = schemas.signapSchema.validate(req.body);
	if (error) throw HttpError(400, 'Error from Joi or other validation library');

	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(401, 'Email or password is wrong');

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');

	const payload = {
		id: user._id,
	}

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	})
}

const current = async (req, res) => {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	})
}

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: '' });

	res.json({
		'message': 'No Content',
	})
}

const updateSubscription = async (req, res) => {
	const { _id, email } = req.user;
	const subscription = req.body.subscription;

	if (!subscription) throw HttpError(404, 'No subscription to update');
	if (!SUBSCRIPTIONS.includes(subscription)) throw HttpError(404, 'Invalid subscription');

	await User.findByIdAndUpdate(_id, { subscription: subscription });

	res.json({
		email,
		subscription,
	})
}

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tmpUpload, originalname } = req.file;
	const filename = `${_id}${originalname}`
	
	const newAvatarSize = await Jimp.read(tmpUpload);
	await newAvatarSize.resize(250, 250).writeAsync(tmpUpload);
	
	const resultUpload = path.join(avatarDir, filename); 
	await fs.rename(tmpUpload, resultUpload);
	
	const avatarURL = path.join('avatars', filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({
		avatarURL,
	})
}

module.exports = {
	register: ctrlWrap(register),
	login: ctrlWrap(login),
	current: ctrlWrap(current),
	logout: ctrlWrap(logout),
	updateSubscription: ctrlWrap(updateSubscription),
	updateAvatar: ctrlWrap(updateAvatar),
}