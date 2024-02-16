//usar mongoose
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(error);
        //bota el proceso de inmediato con el 1
        process.exit(1)
    }
}

//exportar

module.exports = connectDB