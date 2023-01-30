//Required;
const express = require('express');
const App = express();
const cors = require('cors');
require('./Src/Config/Connection');
const UserData = require('./Src/Routes/Route');

//Middleware;
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors({ origin: "*"}))


//User Routes;
App.use('/',UserData)
App.use('/User',UserData)


//Port Listing;
const PORT = process.env.PORT || 8888;
App.listen(PORT, () => {
    console.log('Port is Running on ' + PORT);
});