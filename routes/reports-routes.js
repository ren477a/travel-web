const router = require('express').Router()
const reportsController = require('../controllers/reports.controller')


router.post('/test', reportsController.test)
router.post('/dailysales', reportsController.dailySales)
router.post('/monthlysales', reportsController.monthlySales)
// router.post('/test', reportsController.test)
// router.post('/test', reportsController.test)

module.exports = router