const mongoose = require('mongoose');
require('dotenv').config();

async function connect (){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb.urkvz.mongodb.net/Social-media`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify : false
        });
        console.log("Successful connnected!");
    } catch (error) {
        console.log("Fail to connect to MongoDB!");
    }
}

module.exports = {connect};