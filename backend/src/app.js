const express = require('express');
const app = express();
const Authmodel = require('./models/authmodel');
const authRoutes = require('./routes/authroutes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());


app.use('/api/auth', authRoutes);
module.exports = app;