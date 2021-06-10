const pool = require('../db')

import { IShop } from '../models'

class ShopController  {
    async createShop(req, res) {
        try {
            const newShop: IShop = req.body
            const nShop = await pool.query(`INSERT INTO shops (company, city, address, count_of_registers) values ($1, $2, $3, $4) RETURNING *`, [newShop.company, newShop.city, newShop.address, req.body.count_of_registers])
            const {id} = nShop.rows[0]
            
            // If TABLE 'cashregisters' doesn't have at least one register with current shop_id. Then add n registers
            const currentShopRegistersInDB = pool.query(`SELECT * FROM cashregisters WHERE shop_id = $1`,[id]) 
            if(!currentShopRegistersInDB.rowCount){
                for(let i=1; i<=req.body.count_of_registers; i++){
                    console.log(` - ${i}`)
                    await pool.query(`INSERT INTO cashregisters (registernumber, shop_id) values ($1, $2) RETURNING *`, [i, id])
                }
            }
            //______________________________________________________________________________________________

            res.status(200).json({newShop, message: "Successfully added!" })
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    async getShopById(req, res) {
        const id = req.params.id;
        const response = await pool.query(`SELECT * FROM shops WHERE ID = $1`, [id]);
        !!response.rowCount
            ? res.status(200).json(response.rows)
            : res.status(500).json({status: false, message: `Shop with | ID ${id} | doesn't exists!`}) ;
    }

    async getAllShops(req, res) {
        const shops = await pool.query(`SELECT * FROM shops`)
        !!shops.rowCount 
            ? res.status(200).json(shops.rows) 
            : res.status(200).json({message: 'Table is empty'})
    }

    async deleteShop(req, res) {
        const id = req.params.id;
        const find = await pool.query(`SELECT * FROM shops WHERE ID = $1`, [id]);
        if (!find.rowCount){
            res.status(404).json({status: false, message: `Shop with | ID ${id} | doesn't exists!`})
        } else {
            const response = await pool.query(`DELETE FROM shops WHERE id = $1`, [id]);
            res.status(200).json({ status: true, message: `Shop with | ID ${id} |- Successfully deleted!` })
        }
    }

    async deleteAllShops(req, res){
        await pool.query(`DELETE * FROM shops`)
        await pool.query(`ALTER SEQUENCE shops_id_seq RESTART WITH 1;`)
        res.status(200).json({status: true, message: "Table shops is empty"})
    }
}

module.exports = new ShopController()