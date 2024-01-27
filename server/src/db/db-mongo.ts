const mongoose = require('mongoose');

const DB= process.env.MONGODB_URL;

mongoose.connect(DB).then(() => {
    console.log('Connected Succesfully!');
}).catch((err: Error) =>console.log("Connection Failed"));