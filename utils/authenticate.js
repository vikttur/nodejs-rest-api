const jwt = require('jsonwebtoken');
const { HttpError } = require('./HttpError');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer') next(HttpError(401));

	try {
		const { id } = jwt.verify(token, SECRET_KEY);
		// console.log(id);
		const user = await User.findById(id);
		// console.log(user);
		if (!user || !user.token || user.token !== token) next(HttpError(401));

		req.user = user;
		// console.log(req.user._id);
		next();
	} 
	catch {
		next(HttpError(401));
	}
}

module.exports = { 
	authenticate,
}