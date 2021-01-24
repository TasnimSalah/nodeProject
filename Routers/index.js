const express = require('express');
const blog = require('./blogs');
const user = require('./user');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use('/users' , user);


router.use('/blogs' ,auth , blog);



module.exports = router;

