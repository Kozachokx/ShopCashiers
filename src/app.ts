import express from 'express'
const router = express.Router()

const app: express.Application = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

// app.get('/', (req,res) => {
//     res.send('Works fine');
// } );

const CashierController = require('./controller/cashier_controller')
// import { ShopController } from './db'

// const CashierController = require('./db')
router.post('/cashier', CashierController.createCashier)
router.get('/cashiers', CashierController.getAllCashiers)


//Routes for ShopController
const ShopController = require('./controller/shop_controller')

router.post('/shop', ShopController.createShop)
router.get('/shops', ShopController.getAllShops)
router.get('/shops/:id', ShopController.getShopById)
router.delete('/shops/:id', ShopController.deleteShop)



// Routes for CashRegister
const CashRegisterController = require('./controller/chashregister_controller')
router.get('/cashregisters', CashRegisterController.getAllCashRegisters)
router.post('/cashregister', CashRegisterController.createCashRegister)




app.use('/api', router)
app.listen(PORT, ()=>{ console.log(`Server runs at port ${PORT} | try to use http://localhost:${PORT}`) })


app.get('/indx', (req, res) => {
    res.sendFile(__dirname + '/index.html')}
)


app.post('/app', (req, res) => {
    console.log(`u're not fucked up`)
} )



// getAllCashiers + getTargetCashiers1 + getTargetCashiers2


