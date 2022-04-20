const slugify = require("slugify");
const Blogs = require('../models/blogs'); 
const { v4: uuidv4 } = require('uuid');
//Create data
exports.create = (req, res) => {
    const {title, content, author, type, duration} = req.body;
    let slug =  slugify(title)

    if(!slug) {
        slug = uuidv4();
    }

    switch(true){
        case !title:
            return res.status(400).json({error:"please insert title"});
            break;
        case !content:
            return res.status(400).json({error:"please insert content"});
            break;
    }
    Blogs.create({title, content, author,type, duration, slug}, (err, blog)=>{
        if(err){
            res.status(400).json({error:`มีข้อมูลซ้ำ`});
        }
        res.json(blog);
    });
};

exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec((err, blogs)=> {
        res.json(blogs);
    })
};

//get url from slugify
exports.singleBlog = (req, res) => {
    const {slug} = req.params
    console.log(`${slug}`)
    Blogs.findOne({slug}).exec((err, blog)=> {
        res.json(blog);
    })
};

exports.remove = (req, res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err, blog)=> {
        if(err) console.log(err);
        res.json({message:"ลบเรียบร้อย"});
    })
};

exports.update = (req, res) => {
    const {slug} = req.params;
    const {title, content} = req.body;
    Blogs.findOneAndUpdate({slug}, {title, content}, {new:true}).exec((err, blog)=> {
        if(err) console.log(err);
        res.json(blog);
    })
}