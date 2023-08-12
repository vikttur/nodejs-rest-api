const express = require('express');
const controls = require('../../controllers/contacts');
const { isValidId } = require('../../utils');

const router = express.Router();

router.get('/', controls.getAll)
router.get('/:id', isValidId, controls.getById)
router.post('/', controls.postAdd)
router.put('/:id', isValidId, controls.updateById)
router.patch('/:id/favorite', isValidId, controls.updateStatusContact)
router.delete('/:id', isValidId, controls.deleteById)

module.exports = router
