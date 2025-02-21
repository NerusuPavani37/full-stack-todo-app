const mongoose = require("mongoose");

const connectDB = async () => {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((error) => console.error("MongoDB Connection Error:", error));
};

module.exports = connectDB;
