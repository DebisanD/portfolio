const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URL || process.env.MONGODB_URI;

  if (!mongoURI) {
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('ℹ️ [MongoDB Notice] MONGO_URL not configured. Utilizing JSON memory store.');
      return false;
    }
  }

  try {
    const conn = await mongoose.connect(mongoURI || 'mongodb://localhost:27017/portfolio', {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`🍃 [MongoDB Connected] Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ [MongoDB Warning] Connection issue (${err.message}). Server using JSON memory store.`);
    return false;
  }
};

module.exports = connectDB;

