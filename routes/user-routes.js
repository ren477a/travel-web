const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.readAll)

router.get('/:id', userController.read)

router.put('/:id', userController.update)

router.delete('/:id', userController.delete)



module.exports = router;
