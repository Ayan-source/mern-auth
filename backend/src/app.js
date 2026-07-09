const express = require('express');
const app = express();
const Authmodel = require('./models/authmodel');
const authRoutes = require('./routes/authroutes');
app.use(express.json());

app.post('/register', async (req, res) => {
    const {user,password} = req.body;
    const newUser = await Authmodel.create({
        user:user,
        password:password
    });
    return res.status(201).json(
        {
            message: 'User registered successfully',
            user: newUser
        }
    );
})
app.get('/users', async (req, res) => {
    const users = await Authmodel.find();
    return res.status(200).json(users);
});

app.use('/api/auth', authRoutes);
module.exports = app;