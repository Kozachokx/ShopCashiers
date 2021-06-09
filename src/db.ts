// main methods (CRUD) + db connection; imports stuff from models.ts.

import {Pool} from "pg"

const pool = new Pool({
    user: "postgres",
    password: '123',
    host: "localhost",
    port: 5432,
    database: "ShopCashiers"
})

module.exports = pool




/*

-	getTargetCashiers1, який вертає усіх касирів магазину за всю історію роботи магазинів ATB у місті Львів,
        які мають більше 5 років досвіду та раніше працювали у Silpo або Arsen

    SELECT * FROM Cashiers WHERE Experience >= 5 AND PreviousWork 

    SELECT * FROM Cashiers WHERE CurrentShop_id.Company = 'ATB' AND CurrentShop_id.City = 'Lviv'
    SELECT * FROM Cashiers WHERE 'Silpo' OR 'Arsen' = ANY(PreviousWork) AND Experience >= 5


-	getTargetCashiers2, який вертає усіх касирів магазину ATB за адресою Шевенка 100, 
        які працюють на касах з непарним числом щопонеділка у нічну зміну (23:00 - 07:00).

    SELECT .... where ( [RegNumber] % 2 = 1 ) AND 'Monday' = ANY(WorkingDays) AND Duty = 'Night


*/