const express  = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/:postId', async (req,res) => {
    try{
        const RetrievePost = await Post.findById(req.params.postId);
        console.log("Hindi nag delete");
        res.json(RetrievePost);
    }
    catch(err){
        res.json({message:err});
    }
});

router.delete('/:postId', async (req,res) => {
    try{
        const deletePost = await Post.remove({_id:req.params.postId});
        res.json(deletePost);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/',async(req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
})

router.post('/',async (req,res) => {
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    })
    try{
    const NewPost = await post.save();
    res.json(NewPost);
    }
    catch(err){
        res.json(err);
    }
});

module.exports = router;