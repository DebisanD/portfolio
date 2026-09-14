const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URL || 'mongodb://localhost:27017/portfolio';
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🍃 [MongoDB Connected] Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ [MongoDB Warning] Local MongoDB connection issue (${err.message}). Server will use MongoDB schema fallback.`);
    return false;
  }
};

module.exports = connectDB;
