const pool = require('../db')

import { IShop } from '../models'

class ShopController  {
    async createShop(req, res) {
        try {
            const newShop: IShop = req.body
            const nShop = await pool.query(`INSERT INTO shops (company, city, address) values ($1, $2, $3) RETURNING *`, [newShop.company, newShop.city, newShop.address])
            res.status(200).json({ "status": true, newShop, message: "Successfully added!" })
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
        // console.log(shops.rows)
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
        res.status(200).json({status: true, message: "Table shops is empty now"})
    }

}

module.exports = new ShopController()