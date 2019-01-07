module.exports = function(connection, Sequelize) {
    const product = connection.define('product', {
    product_name: {
          type: Sequelize.STRING,
          validate: {
              len:[2,100]
          }
      },
    department_name: {
        type: Sequelize.STRING,
        validate: {
            len:[2,30]
        }
    },
    price: Sequelize.DECIMAL,
    stock_quantity: Sequelize.INTEGER
    });
  
    return product;
  }