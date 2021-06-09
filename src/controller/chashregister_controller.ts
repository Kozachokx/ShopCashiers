const pool = require('../db')

import { Console } from 'console'
import { ICashRegister } from '../models'

class CashRegisterController {
    async createCashRegister(req, res){
        try {
            const newCashRegister: ICashRegister = req.body
            // console.warn(newCashRegister)
            
            // const newRegister = await pool.query(`INSERT INTO cashregisters (registernumber, shop_id) values ($1, $2) RETURNING *`, [newCashRegister.registerNumber, newCashRegister.shop_id])
            const checkShop = await pool.query(`SELECT company FROM shops WHERE id = $1`,[newCashRegister.shop_id])
            console.log(checkShop.rows)
            
            res.status(200).json({ "status": true, newCashRegister, message: "Successfully added!" })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getAllCashRegisters(req, res){
        const response = await pool.query(`SELECT * FROM cashregisters`)
        // console.warn(!!response.rowCount)
        !response.rowCount 
            ? res.status(200).json({status:false, message: "Table is empty"}) 
            : res.status(200).json(response.rows)
    }
}

module.exports = new CashRegisterController()