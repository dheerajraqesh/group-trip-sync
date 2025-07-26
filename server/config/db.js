const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/group-trip-sync', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connect };