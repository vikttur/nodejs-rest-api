const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { HttpError, ctrlWrap } = require('../utils');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) throw HttpError(409, 'Email is already in use');

	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	})
}

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) throw HttpError(401, 'Email or password invalid');

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
	const { name, email } = req.body;

	res.json({
		name,
		email,
	})
}

const logout = async (req, res) => {
	const { _id } = req.user;
	console.log(_id);
	await User.findByIdAndUpdate(_id, { token: '' });

	const { status, message } = next(HttpError(204));
	res.json({
		// message: 'Logout success'
		message: status,
	})
}

module.exports = {
	register: ctrlWrap(register),
	login: ctrlWrap(login),
	current: ctrlWrap(current),
	logout: ctrlWrap(logout),
}