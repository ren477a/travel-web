const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const Tour = require('../models/tour')
const tourController = require('../controllers/tour.controller')

const myBucket = 'travelcatalog';
const upload = require('../config/upload')
const s3 = require('../config/upload').s3

router.get('/', tourController.readAll)

router.post('/', tourController.create)

router.get('/:id', tourController.read)

router.put('/:id', tourController.update)

router.post('/upload', tourController.upload)

module.exports = router