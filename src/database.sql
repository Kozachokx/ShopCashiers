create TABLE Person(
    id SERIAL PRIMARY KEY,
    name VATCHAR(255),
    surrname VATCHAR(255)
);

create TABLE Posts(
    id SERIAL PRIMARY KEY,
    title VATCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Person(id)
);


CREATE TYPE public."enumGender" AS ENUM
    ('Male', 'Female');

CREATE TYPE public."enumCompanies" AS ENUM
    ('ATB', 'Silpo', 'Arsen', 'METRO');

CREATE TYPE public."enumDuty" AS ENUM
    ('Day', 'Night');

CREATE TYPE public."enumWorkingDays" AS ENUM
    ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');




CREATE SEQUENCE shops_id_seq;
CREATE TABLE shops
(
    id bigint NOT NULL DEFAULT nextval('shops_id_seq'::regclass),
    company "enumCompanies" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    count_of_registers smallint NOT NULL,
    CONSTRAINT "shop_pkey" PRIMARY KEY (id)
)


CREATE SEQUENCE cashiers_id_seq;
CREATE TABLE cashiers
(
    id bigint NOT NULL DEFAULT nextval('cashiers_id_seq'::regclass),
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    gender "enumGender" NOT NULL,
    age smallint NOT NULL,
    experience smallint NOT NULL,
    previous_work "enumCompanies"[],
    duties "enumDuty"[],
    working_days "enumWorkingDays"[],
    cashregister_ids integer[],
    CONSTRAINT "cashier_pkey" PRIMARY KEY (id)
)

CREATE SEQUENCE cash_register_id_seq;
CREATE TABLE cashregisters
(
    id bigint NOT NULL DEFAULT nextval('cash_register_id_seq'::regclass),
    registernumber smallint NOT NULL,
    shop_id INTEGER, FOREIGN KEY (shop_id) REFERENCES shops(id),
    -- shop_id bigint NOT NULL DEFAULT nextval('"Cash Register_shop_id_seq"'::regclass),
    CONSTRAINT "cash_register_pkey" PRIMARY KEY (id)
)

CREATE SEQUENCE cashier_shedules_id_seq;
CREATE TABLE cashier_shedules
(
    id bigint NOT NULL DEFAULT nextval('cashier_shedules_id_seq'::regclass),
    cashier_id bigint,
    duty_day "enumWorkingDays",
    duty "enumDuty",
    register_id bigint,
    CONSTRAINT cashier_register_duty_pkey PRIMARY KEY (id)
)