const express = require('express');
const Blog = require('../models/Blogs');
const blog = require('./blogs');
const user = require('./user');
const auth = require('../middlewares/auth');

const router = express.Router();
router.use('/users' , user);
router.use('/blogs' ,auth , blog);

//home
router.get('/home' , async ( req , res , next )=>{
    try{
        const todos = await Blog.find().sort({ created_at: -1 });
        res.json(todos);
    } catch (e){
        next(e);
    }
});



module.exports = router;

