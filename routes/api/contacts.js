const express = require('express');
const ctrlContacts = require('../../controllers/contacts');
const { isValidId } = require('../../utils');

const router = express.Router();

router.get('/', ctrlContacts.getAll)
router.get('/:id', isValidId, ctrlContacts.getById)
router.post('/', ctrlContacts.postAdd)
router.put('/:id', isValidId, ctrlContacts.updateById)
router.patch('/:id/favorite', isValidId, ctrlContacts.updateStatusContact)
router.delete('/:id', isValidId, ctrlContacts.deleteById)

module.exports = router
