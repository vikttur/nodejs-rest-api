const ctrlWrap = ctrl => {
	const funcWrap = async (req, res, next) => {
		try {
			await ctrl(req, res);
		}
		catch (error) {
			next(error);
		}
	}

	return funcWrap;
}

module.exports = { ctrlWrap }