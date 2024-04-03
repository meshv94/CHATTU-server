const mongoose = require("mongoose")

const connect_DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connection successful")
    } catch (error) {
        console.log("database error : " , error)
    }
}

module.exports = connect_DB