var mysql = require('mysql')
var inquirer = require('inquirer')
require("console.table");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// server connection
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    loadProducts();
});

function loadProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        chooseItem(res)
    });
}

// check the inventory for the selected item

function chooseItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "Enter the id of the item you want to purchase (press e to exit)",
            validate: function (val) {
                return !isNaN(val) || val.toLowerCase() === "e"; //changes user input to lower case
            }
        }
    ])
        .then(function (val) {
            userExit(val.choice);

            var productId = parseInt(val.choice);
            var product = checkInventory(productId, inventory);

            if (product) {

                productQty(product);
            }
            else {
                console.log("\nItem not available.");
                loadProducts();
            }
        });
}

// choose QTY prompt 
function productQty(product) {

    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "Enter quantity of product desired (press e to exit)",
            validate: function (val) {
                return val > 0 || val.toLowerCase() === "e";
            }
        }
    ])
        .then(function (val) {
            userExit(val.quantity);
            var quantity = parseInt(val.quantity);
            // checking stock qty
            if (quantity > product.stock_quantity) {
                console.log("\nInsufficient qty entered");
                loadProducts();
            }
            else {
                purchase(product, quantity);
            }
        });
}

// purchase product
function purchase(product, quantity) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id],
        function (err, res) {

            console.log("\nPurchase complete" + quantity + " " + product.product_name + "'s");
            loadProducts();
        }
    );
}

function checkInventory(productId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === productId) {
            return inventory[i];
        }
    }
    return null;
}

function userExit(choice) {
    if (choice.toLowerCase() === "e") {
        console.log("Thank you for your purchase");
        process.exit(0);
    }
}
