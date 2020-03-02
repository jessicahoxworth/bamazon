DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_id INT
    AUTO_INCREMENT NOT NULL,
    product_name varchar
    (255) NOT NULL,
    department_name varchar
    (255) NOT NULL,
	price DECIMAL
    (10,2) NOT NULL,
    stock_quantity varchar
    (25) NOT NULL,
	PRIMARY KEY id)
);

    SELECT *
    FROM products;

    INSERT IGNORE
    INTO products
    (product_name, department_name, price, stock_quantity)
    VALUES
    ("Alexa TV Remote", "Electronic Accessories", 24.99, 10),
    ("Alexa Echo Dot Smart Speaker", "Electronics", 59.99, 0),
    ("Fujifilm INSTAX Mini Film", "Electronics Accessories", 32.00, 4),
    ("Instant Pot", "Kitchen Appliances", 89.00, 3),
    ("Furminator", "Pet Accespries", 31.00, 3),
    ("Vegetable Spiralizer", "Kitchen", 29.50, 1),
    ("Queens Greatest Hits Vinyl", "Music", 25.00, 10),
    ("Yoga Mat", "Health & Fitness", 35.00, 7),
    ("Columbia Womens Hiking Boots", "Outdoors", 89.00, 13),
    ("Stainless Steel Straws", "Kitchen", 10.99, 9);
