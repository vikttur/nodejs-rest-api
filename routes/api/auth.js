const express = require('express');
const ctrlUsers = require('../../controllers/auth');

const router = express.Router();

router.post('/register', ctrlUsers.register);
router.post('/login', ctrlUsers.login);

module.exports = router

