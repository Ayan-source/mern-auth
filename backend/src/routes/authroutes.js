const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller');


// router.get('/test', (req, res) => {
//     res.json({message: 'Auth route is working'});
// });
// router.post('/register',authcontroller.register);
// router.get('/users', authcontroller.getAllUsers);
// router.get('/users/:id',authcontroller.getUserById);
// router.put('/users/:id', authcontroller.updateUserById);
// router.delete('/users/:id', authcontroller.deleteUserById);
// router.post('/login', authcontroller.login);

router.post('/signup', authcontroller.signup)
router.post('/login', authcontroller.login)
router.post('/logout', authcontroller.logout)

module.exports = router;