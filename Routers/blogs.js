const express = require('express');
const { create, show, getById, update, remove  } = require('../controllers/blog');
const multer = require('multer')



const router = express.Router();
//the destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname );
    }
});

const upload = multer({ storage: storage });

//create
router.post('/', upload.single('photo'), async (req, res, next) => {
    const { body, user: { id } } = req;
    const path = req.file.path;
    try {
        const blog = await create({ ...body, author: id , photo: path });
        res.json(blog);
    } catch (e) {
        //send error to error handler
        next(e);
    }


});


//show 
router.get('/', async (req, res, next) => {
    const { user: { id } } = req;
    try {
        const blog = await show({ author: id });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});


//findById
router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blog = await getById(id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
});


//update
router.patch('/:id', upload.single('photo') , async (req, res, next) => {
    const { params: { id }, body } = req;
    const path = req.file.path;
    try {
        const blog = await update(id, {...body , photo:path});
        res.json(blog);
    } catch (e) {
        next(e);
    }
});

//delete 
router.delete('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const blog = await remove(id);
        res.json(blog);
    } catch (e) {
        next(e);
    }
});




module.exports = router;