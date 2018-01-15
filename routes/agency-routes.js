const router = require('express').Router()
const agencyController = require('../controllers/agency.controller')

router.get('/', agencyController.readAll)

router.get('/:id', agencyController.read)



module.exports = router;
