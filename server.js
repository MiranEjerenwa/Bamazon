// Imports express into our app and sets it up for use
const express = require('express');
const path = require('path');
const app = express();
// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 8080;
// Import Database Models for syncing
// =============================================================
const db = require('./models');
// Sets up our server to parse our request body for usage
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
// Routes
// =============================================================
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
// Syncs our database first
db.sequelize.sync().then(function(){
console.log('Database is synced!');
// Starts our server on the predefined PORT
// Only starts if the db successfully syncs
app.listen(PORT, function(){
console.log(`App is now listening on PORT ${PORT}`)
});
});


// ?Not needed