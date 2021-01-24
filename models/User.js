const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Schema } = mongoose;


const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        birthDay: {
            type: Date,
            required: true,
        },
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],


    },
    {
        toJSON: {
            transform: (doc, ret, options) => {
                delete ret.password;
                return ret;
            },
        },

    },

);

userSchema.pre('save', function bcryptPassword(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, saltRounds);
    next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;