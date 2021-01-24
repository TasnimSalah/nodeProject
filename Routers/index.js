const express = require('express');
const blog = require('./blogs');
const user = require('./user');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use('/users' , user);
router.use('/blogs' ,auth , blog);

//home
router.get('/home' , auth , async ( req , res , next )=>{
    try{
        const todos = await Todo.find().sort({ created_at: -1 });
        res.json(todos);
    } catch (e){
        next(e);
    }
});



module.exports = router;

