const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const flaconRouter = require('./flaconRouter')
const categoryRouter = require('./categoryRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/flacon', flaconRouter)
router.use('/product', productRouter)

module.exports = router
