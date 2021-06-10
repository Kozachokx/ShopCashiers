const pool = require('../db')

import { Console, error } from 'console'
import { ICashRegister } from '../models'

class CashRegisterController {
    async createCashRegister(req, res){
        try {
            const newCashRegister: ICashRegister = req.body
            const checkShop = await pool.query(`SELECT company FROM shops WHERE id = $1`,[newCashRegister.shop_id])

            //Catch error if shop_id doesn't exists
            if(!checkShop.rowCount ){ throw new Error(`Shop with id ${newCashRegister.shop_id} doesn't exists!`) }
            //else add new register

            await pool.query(`INSERT INTO cashregisters (registernumber, shop_id) values ($1, $2) RETURNING *`, [newCashRegister.registerNumber, newCashRegister.shop_id])
            res.status(200).json({newCashRegister, message: "Successfully added!" })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getAllCashRegisters(req, res){
        const response = await pool.query(`SELECT * FROM cashregisters`)
        // Check tableIsEmpty
        !response.rowCount 
            ? res.status(200).json({status:false, message: "Table is empty"}) 
            : res.status(200).json(response.rows)
    }

    async getCashRegisterById(req, res) {
        const id = req.params.id;
        const response = await pool.query(`SELECT * FROM cashregisters WHERE ID = $1`, [id]);
        !!response.rowCount
            ? res.status(200).json(response.rows)
            : res.status(500).json({status: false, message: `Cash Register with | ID ${id} | doesn't exists!`}) ;
    }


    async deleteCashRegisterById(req, res) {
        const id = req.params.id;
        const find = await pool.query(`SELECT * FROM cashregisters WHERE ID = $1`, [id]);
        if (!find.rowCount){
            res.status(404).json({status: false, message: `Shop with | ID ${id} | doesn't exists!`})
        } else {
            await pool.query(`DELETE FROM shops WHERE id = $1`, [id]);
            res.status(200).json({ status: true, message: `Shop with | ID ${id} |- Successfully deleted!` })
        }
    }

    async deleteAllCashRegisters(req, res){
        await pool.query(`DELETE * FROM cashregisters`)
        await pool.query(`ALTER SEQUENCE cash_register_id_seq RESTART WITH 1;`)
        res.status(200).json({status: true, message: "Table cashregisters is empty"})
    }
}

module.exports = new CashRegisterController()