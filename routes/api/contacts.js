const express = require('express');
const ctrlContacts = require('../../controllers/contacts');
const { isValidId } = require('../../utils');
const { authenticate } = require('../../utils/authenticate');
const router = express.Router();

router.get('/', authenticate, ctrlContacts.getAll)
router.get('/:id', authenticate, isValidId, ctrlContacts.getById)
router.post('/', authenticate, ctrlContacts.postAdd)
router.put('/:id', authenticate, isValidId, ctrlContacts.updateById)
router.patch('/:id/favorite', authenticate, isValidId, ctrlContacts.updateStatusContact)
router.delete('/:id', authenticate, isValidId, ctrlContacts.deleteById)

module.exports = router
