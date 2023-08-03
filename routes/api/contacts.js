const express = require('express');
const controls = require('../../controllers/contacts');

const router = express.Router();

router.get('/', controls.getAll)
router.get('/:id', controls.getById)
router.post('/', controls.postAdd)
router.put('/:id', controls.updateById)
router.delete('/:id', controls.deleteById)

module.exports = router
