const express = require('express');
const app = express();
const authRoutes = require('./routes/authroutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
module.exports = app;