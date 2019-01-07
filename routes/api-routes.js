// Dependencies
// =============================================================
// Requiring our models
const db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the products
  app.get('/api/product', function(req, res) {
    db.product.findAll({}).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // Get route for retrieving a single product
  app.get('/api/product/:id', function(req, res) {
    db.product.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

   // Get route for retrieving a product category
   app.get('/api/product/department_name/:id', function(req, res) {
    db.product.department_name.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // POST route for saving a new product
  app.post('/api/product', function(req, res) {
    db.product.create(req.body).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // PUT route for updating products
  app.put('/api/product/:id', function(req, res) {
    db.product.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
    }).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

  // DELETE route for deleting products
  app.delete('/api/product/:id', function(req, res) {
    db.product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbproduct) {
      res.json(dbproduct);
    }).catch(function(error) {
      res.json({ error: error });
    });
  });

};