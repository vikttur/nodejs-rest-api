const express = require('express');
const ctrlUsers = require('../../controllers/auth');
const { authenticate } = require('../../utils/authenticate');
const { upload } = require('../../utils/upload');

const router = express.Router();

router.post('/register', ctrlUsers.register);
router.post('/login', ctrlUsers.login);
router.get('/current', authenticate, ctrlUsers.current);
router.post('/logout', authenticate, ctrlUsers.logout);
router.patch('/subscription', authenticate, ctrlUsers.updateSubscription);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlUsers.updateAvatar);

module.exports = router

