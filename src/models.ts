const enum Gender {
    Male = 'Male',
    Female = 'Female'
}

const enum Companies {
    ATB = 'ATB',
    Silpo = 'Silpo',
    Arsen = 'Arsen',
    METRO = 'METRO'
}

const enum Duty {
    Day = 'Day',
    Night = 'Night'
}

const enum Days {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}


interface IPerson {
    readonly id: Number
    first_name: string
    last_name: string
    age: Number
    gender: Gender
}

export interface ICashier extends IPerson {
    duties: Array<Duty>
    workingDays: Array<Days>
    cashregister_ids: Array<Number>
    expirience?: Number
    previousWork?: Array<Companies>
}

export interface IShop {
    readonly id: Number
    company: Companies
    city: string
    address: string
}

export interface ICashRegister {
    readonly id: Number
    registerNumber: Number
    shop_id: Number
}


console.log()

/*

Monday : Night
Tuesday : Night
Thursday : Day
Saturday : Night

*/

// const newArr: Array<Days> = []