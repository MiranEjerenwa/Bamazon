var inquirer = require("inquirer");
var mysql = require("mysql");
var path = require("path");
var Table = require("cli-table");

// MySQL connectioon
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "root",
database: "bamazon_db"
});

connection.connect(function(err) {
if (err) throw err;
console.log("connected as id " + connection.threadId);
displayStock();
});

//function to display inventory
function displayStock() { 
var table = new Table({
head: ['Item', 'Product', 'Dept', 'Price', 'Quantity']
, colWidths: [10, 40, 15, 10, 20]
});

connection.query("SELECT * FROM product", function(err, res) {

for (var i = 0; i < res.length; i++) {

//display inventory
formattedData = [res[i].item_id,res[i].product_name,res[i].department_name,"$"+res[i].price.toFixed(2),res[i].stock_quantity];
table.push(formattedData);
}
console.log(table.toString());
});
//run function order with time out delay to allow display of stock

setTimeout(order, 1500);
function order() {
    inquirer.prompt([
    {
    name: "item_id",
    type: "input",
    message: "Welcome to The Bamazon, Please enter the ID of the item you would like to buy, located on the far left column…"
    },
    {
        name: "quantityInput",
        type: "input",
        message: "Please enter how many units of this product you would like to buy:",

        validate: function(value) {
        if (isNaN(value) === false && value > 0) {
        return true;
        }
        return false;
        }
        },
        ]) //after selection proceed, check inventory 
        .then(function(answer) {
        var orderItem = answer.item_id;
        var orderQuantity = answer.quantityInput;
        // Confirm inventory exists using id
        connection.query("SELECT * FROM product WHERE ?",
        {item_id: orderItem}, 
        //if not enough inventory 
        function(err, res) {
        if (err) throw err;
        if(res.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID from the column on the far left.');        
        }else{
            var productInfo = res[0];
        }

       if (orderQuantity > productInfo.stock_quantity) {
        console.log("Sorry insufficient quantity");
        displayStock(); 
        } 

        else {
        //if enough inventory
        var newQuantity = productInfo.stock_quantity - orderQuantity;
        console.log(orderQuantity);
        console.log(productInfo.Stock_quantity);
        console.log(newQuantity);
        connection.query("UPDATE product SET ? WHERE ?", [{
        stock_quantity: newQuantity},
        {
        item_id: orderItem
        }],
        function(error) {
        if (error) throw err;
        console.log("Your Order was placed successfully!");
        displayOrderTotal(orderItem, orderQuantity);
        })
        }
        });
        });
        }
        function displayOrderTotal(orderItem, orderQuantity) {
        connection.query("SELECT * FROM product WHERE ?",
        {
        Item_ID: orderItem
        }, 
        
        function(error, res) {
        if (error) throw err;
        var orderTotal = orderQuantity * res[0].price;
        console.log("Total Order purchase is $" + orderTotal.toFixed(2));
        purchaseAgain();
        });
        };

        function purchaseAgain() { 
        inquirer.prompt({
        type: "list",
        name: "purchaseAgain",
        message: "Would you like to purchase more product ?",
        choices: ["Yes, order again", "No, I am done"]
        }).then (function(answer) {
        if (answer.purchaseAgain === "Yes, order again") {
        displayStock();
        } 
        else {
        connection.end();
        }
        });
        }        
}

//function to order: ask two questions item and how many to order
