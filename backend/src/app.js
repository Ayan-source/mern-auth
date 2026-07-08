const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Worldjfkljsdkljf!');
});

app.post('/admin',(req,res) => {
    const {user,password} = req.body;
    res.status(201).json(
        {
            message:"hello from post123",
            user,password
        }
    )
})

app.get('/admin',(req,res)=>{
    res.send("hello from get")
})

module.exports = app;