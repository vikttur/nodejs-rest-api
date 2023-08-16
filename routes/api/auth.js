const express = require('express');
// const { schemas } = require('../../models/user');
const ctrlUsers = require('../../controllers/auth');
// const { isValidId } = require('../../utils');

const router = express.Router();

router.post('/register', ctrlUsers.register);

module.exports = router

