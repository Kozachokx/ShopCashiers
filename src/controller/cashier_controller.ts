const pool = require('../db')

import { Console } from 'console'
import { ICashier } from '../models'

class CashierController {
    async createCashier(req, res) {
        try {
            const newCashier: ICashier = req.body

            newCashier.duties.length = newCashier.workingDays.length
            newCashier.cashregister_ids.length = newCashier.workingDays.length
            // Refill some fields if they exists
            for(let i = 0; i < newCashier.workingDays.length; i++){
                !!newCashier.duties[i] ? newCashier.duties[i] : newCashier.duties[i] = newCashier.duties[0]
                !!newCashier.cashregister_ids[i] ? newCashier.cashregister_ids[i] : newCashier.cashregister_ids[i] = newCashier.cashregister_ids[0]
            }
            
            const newUser = await pool.query('INSERT INTO cashiers (first_name, last_name, age, gender, duties, working_days, cashregister_ids, experience, previous_work) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [newCashier.first_name, newCashier.last_name, newCashier.age, newCashier.gender, newCashier.duties, newCashier.workingDays, newCashier.cashregister_ids,  newCashier.expirience, newCashier.previousWork])
            const {id} = newUser.rows[0]

            for(let i = 0; i < newCashier.workingDays.length; i++){
                await pool.query(`INSERT INTO cashier_shedules (cashier_id, duty_day, duty, register_id) values($1, $2, $3, $4) RETURNING *`, [id, newCashier.workingDays[i], newCashier.duties[i], newCashier.cashregister_ids[i]])
            }
            // res.json(newUser)

            res.status(200).json({ "status": true, newCashier, message: "Successfully added!" })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    async getAllCashiers(req, res) {
        const result = await pool.query(`SELECT * FROM cashiers`)
        console.log(result)
        !!result.rowCount 
            ? res.status(200).json(result.rows) 
            : res.status(200).json({message: 'Table is empty'})
        // res.status(200).json('ok')
    }
}


module.exports = new CashierController()