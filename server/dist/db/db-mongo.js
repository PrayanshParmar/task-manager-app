"use strict";
const mongoose = require('mongoose');
const DB = process.env.MONGODB_URL;
mongoose.connect(DB).then(() => {
    console.log('Connected Succesfully!');
}).catch((err) => console.log("Connection Failed"));
