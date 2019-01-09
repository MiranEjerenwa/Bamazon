-- Create the Bamazon Database
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- Create a Table inside of that database called products
-- Here have to manaually enter item ID in tables
-- CREATE TABLE products (
--     item_id INTEGER NOT NULL,
--     product_name VARCHAR(100) NOT NULL,
--     department_name VARCHAR(30) NOT NULL,
--     price DECIMAL (10,2) NOT NULL,
--     stock_quantity INTEGER,
--     PRIMARY KEY (item_id)
-- );


CREATE TABLE product (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO product(item_id, product_name, department_name, price, stock_quantity) 
  VALUES (item_id,'Camera','Electronics', 99.50, 10),
		 (item_id,'Dell - 19" Laptop', 'Electronics', 799.00, 50),
		 (item_id,'Radar Detector', 'Electronics', 159.99, 10),
		 (item_id,'Private Advisor', 'Books', 11.45, 785),
		 (item_id,'Synthetic Engine Oil 5W-40 1 Quart','Auto',7.99 ,20),
		 (item_id,'Windshield Wiper driver side','Auto', 15.99, 100),
		 (item_id,'Frozen Toy set', 'Entertainment', 69.99, 210),
		 (item_id,'Monopoly Board Game', 'Entertainment', 14.99, 15),
		 (item_id,'Riding Lawn Mower', 'Home Goods', 999.00, 11),
		 (item_id,'Paint bucket', 'Home Goods', 5.99, 35);

SELECT * FROM product;