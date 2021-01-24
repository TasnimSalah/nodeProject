const Blog = require('../models/Blogs');


const create = (blog)=>{
    //call model
    return Blog.create(blog);

};

const show = (query)=>{
    //we use exec to return promise not thinable object
    return Blog.find(query).exec();
}

const getById = (id)=>{
    return Blog.findById(id).exec();
}

const update = (id , body)=>{
    return Blog.findByIdAndUpdate(id, body, {new:true});
}

const remove = (id)=>{
    return Blog.findByIdAndRemove(id);
};





module.exports = {
    create , 
    show ,
    getById,
    update,
    remove
}