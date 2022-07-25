const Router = require('express')
const router = new Router()
const flaconController = require('../controllers/flaconController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), flaconController.create)
router.get('/', flaconController.getAll)

module.exports = router
