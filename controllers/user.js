const User = require('../models/User');
const { promisify } = require('util');//convert sync function to async by promise
const jwt = require('jsonwebtoken');

const asyncSign = promisify(jwt.sign);


const create = (body) => {
  return User.create(body);
};

const show = () => {
  //we use exec to return promise not thinable object
  return User.find({}).exec();
}

const getById = (id) => {
  return User.findById(id).exec();
}

const update = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true });
}

const login = async ({ userName, password }) => {
  // get user from DB
  const user = await User.findOne({ userName }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }

  const token = await jwt.sign({
    userName: user.userName,
    id: user.id,
  }, 'secret-key', { expiresIn: '1h' });

  //throw return promise , we need to resolve user into promise
  return { ...user.toJSON(), token };

};


const follow = async (body, userID) => {
  const followingID = await User.findById(body.id).exec();
  const currentUser = await User.findById(userID).exec();
  if (!followingID) {
    throw Error('NOT FOUND');
  }

  followingID.followers.push(userID);
  currentUser.following.push(body.id);


  console.log(followingID);
  console.log(currentUser);
  return currentUser;

}


module.exports = {
  create,
  show,
  getById,
  update,
  login,
  follow
}