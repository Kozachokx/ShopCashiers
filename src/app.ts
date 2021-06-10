import express from 'express'
const router = express.Router()

const app: express.Application = express()

const PORT = process.env.PORT || 5000

app.use(express.json())


//Routes for Cashier
const CashierController = require('./controller/cashier_controller')

router.post('/cashier', CashierController.createCashier)
router.get('/cashiers', CashierController.getAllCashiers)


//Routes for ShopController
const ShopController = require('./controller/shop_controller')

router.post('/shop', ShopController.createShop)
router.get('/shops', ShopController.getAllShops)
router.get('/shops/:id', ShopController.getShopById)
router.delete('/shops/:id', ShopController.deleteShop)
router.delete('/shops/all', ShopController.deleteAllShops)



// Routes for CashRegister
const CashRegisterController = require('./controller/chashregister_controller')

router.post('/cashregister', CashRegisterController.createCashRegister)
router.get('/cashregisters', CashRegisterController.getAllCashRegisters)
router.get('/cashregisters/:id', CashRegisterController.getCashRegisterById)
router.delete('/cashregister/:id', CashRegisterController.deleteCashRegisterById)
router.delete('/cashregister/all', CashRegisterController.deleteAllCashRegisters)


//Routes for CustomController
const CustomController = require('./controller/custom_controller')

router.get('/target1', CustomController.getTargetCashiers1)
router.get('/target2', CustomController.getTargetCashiers2)




app.use('/api', router)
app.listen(PORT, ()=>{ console.log(`Server runs at port ${PORT} | try to use http://localhost:${PORT}`) })


app.get('/indx', (req, res) => {
    res.sendFile(__dirname + '/index.html')}
)


app.post('/app', (req, res) => {
    console.log(`u're not fucked up`)
} )



// getAllCashiers + getTargetCashiers1 + getTargetCashiers2


