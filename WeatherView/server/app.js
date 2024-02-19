const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const app = express();

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/WeatherView';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Body parsing middleware
app.use(express.json());

// Mount auth router
app.use('/api/auth', authRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
