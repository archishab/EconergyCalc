const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/econergycalc"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

module.exports = connectToMongo;