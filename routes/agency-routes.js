const router = require('express').Router()
const agencyController = require('../controllers/agency.controller')

router.get('/', agencyController.readAll)

router.get('/:id', agencyController.read)

router.put('/:id', agencyController.update)

router.delete('/:id', agencyController.delete)



module.exports = router;
