const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    body: {
        type: String,
        required: true,
    },
    tags:[String],
    created_at: { type: Date, default: Date.now },
    photo:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


   
});


const blogModel = mongoose.model('Blog',blogSchema);

module.exports = blogModel;