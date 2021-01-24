const express = require('express');
const { create , show , getById , update , login , follow } = require('../controllers/user');
const auth = require('../middlewares/auth');


const router = express.Router();

//register
router.post('/' , async ( req , res , next)=>{
    const { body } = req ;
    try{
        const user = await create(body);
        res.json(user);
    } catch(e) {
        next(e);
    }
});

//login
router.post('/login' , async ( req , res , next )=>{
    const { body } = req ;
    try{
        const user = await login(body);
        res.json(user);
    }catch(e){
        next(e);
    }
});

//show 
router.get('/' , auth  , async (req , res , next )=>{
    try{
        const user = await show();
        res.json(user);
    } catch (e){
        next(e);
    }
});


//findById
router.get('/:id' , auth  , async (req , res , next )=>{
    const { params: { id } } = req;
    try{
        const user = await getById(id);
        res.json(user);
    } catch (e){
        next(e);
    }
});

//update
router.patch('/:id' , auth  , async( req , res , next )=>{
    const{ params: { id } , body } = req;
    try{
        const user = await update(id , body);
        res.json(user);
    }catch(e){
        next(e);
    }
});

//follow
router.post('/follow', auth  , async ( req , res , next )=>{
    const { body, user: { id } } = req;
    try {
        const user = await follow(body,  id );
        res.json(user);
    } catch (e) {
        //send error to error handler
        next(e);
    }

});




module.exports = router;