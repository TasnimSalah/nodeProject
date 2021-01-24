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

const update = async (id , body , user_id)=>{
    const blog = await Blog.findById(id).exec();
    if(blog.author != user_id){
        const err = new Error('UN_AUTHENTICATED');
       throw Error('UN_AUTHENTICATED');
    }
    return Blog.findByIdAndUpdate(id, body, {new:true});
}

const remove = async (id , user_id)=>{
    const blog = await Blog.findById(id).exec();
    if(blog.author != user_id){
        const err = new Error('UN_AUTHENTICATED');
       throw Error('UN_AUTHENTICATED');
    }
    return Blog.findByIdAndRemove(id);
};





module.exports = {
    create , 
    show ,
    getById,
    update,
    remove
}