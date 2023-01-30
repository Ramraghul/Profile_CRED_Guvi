//Required And connections;
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set("strictQuery", true);
let Link = process.env.LINK

mongoose.connect(`${Link}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connected Done");
}).catch((error) => {
    console.log(error);
})