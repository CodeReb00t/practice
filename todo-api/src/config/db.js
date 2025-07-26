const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect("mongodb://localhost:27017/todo_db");
        console.log('✅ MongoDB connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;