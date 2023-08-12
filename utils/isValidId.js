const { isValidObjectId } = require('mongoose');
const { HttpError } = require('./HttpError');

const isValidId = (reg, res, next) => {
	const { id } = reg.params;
	
	if (!isValidObjectId(id)) next(HttpError(400, `${id} is not valid id`));
	next();
}

module.exports = {
	isValidId,
}