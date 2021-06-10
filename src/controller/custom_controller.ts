import { Module } from "module"

const pool = require('../db')

class CustomController {
    async getTargetCashiers1(req, res){
        const result = await pool.query(`SELECT DISTINCT cashiers.first_name, cashiers.last_name, cashiers.experience, shops.company, shops.city, cashiers.previous_work  
                                        FROM cashiers 
                                        INNER JOIN cashier_shedules ON cashiers.id = cashier_shedules.cashier_id 
                                        INNER JOIN cashregisters ON cashier_shedules.register_id = cashregisters.id
                                        INNER JOIN shops ON cashregisters.shop_id = shops.id  
                                        WHERE experience >= 5 AND shops.company = 'ATB' AND shops.city = 'Lviv' AND ('METRO' = ANY(cashiers.previous_work) OR 'Arsen' = ANY(cashiers.previous_work) )`)
        res.status(200).json(result.rows)
    }
    async getTargetCashiers2(req, res){
        const result = await pool.query(`SELECT shops.company, cashiers.first_name, cashiers.last_name, shops.address, cashier_shedules.duty_day, cashier_shedules.duty,  cashregisters.registernumber
                                        FROM cashiers
                                        INNER JOIN cashier_shedules ON cashiers.id = cashier_shedules.cashier_id
                                        INNER JOIN cashregisters ON cashier_shedules.register_id = cashregisters.id
                                        INNER JOIN shops ON cashregisters.shop_id = shops.id
                                        WHERE shops.company = 'ATB' AND address = 'Shevchenka 100' AND duty_day = 'Monday' AND duty = 'Night' AND cashregisters.registernumber % 2 = 1`)
        res.status(200).json(result.rows)
    }
}

module.exports = new CustomController()