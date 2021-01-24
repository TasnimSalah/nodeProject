const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');


const asyncVerify = promisify(jwt.verify);

const auth =async ( req , res , next )=>{
    const { headers: { authorization } } = req;
    if(! authorization){
        const err = new Error('UN_AUTHENTICATED');
        next(err);
    }
    try {
        var {id} = await asyncVerify(authorization, 'secret-key');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
      } catch(err) {
        next(err)
      }
};



module.exports = auth;