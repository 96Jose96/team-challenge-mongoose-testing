const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

router.post('/create', async(req,res) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        console.log("There was a problem triying to create a post")
    }
})

router.get('/',async(req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).send(posts)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'There was a problem trying to create the posts' })
        
    }
})

router.get('/id/:_id',async(req,res) => {
    try {
        const post = await Post.findById(req.params._id)
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: 'There was a problem fetching the posts' })
    }
})


router.get('/title/:title',async(req,res) => {
    try {
         const title = req.params.title
         const post = await Post.findOne({ title: title })
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: 'There was a problem fetching the posts' })
    }
})

router.put('/id/:_id', async (req,res) => {
    try {
        const idPost = req.params._id
        await Post.updateOne({_id: idPost}, {title: req.body.title, body: req.body.body})
        const post = await Post.findById(idPost).exec()
        res.json(post)
    } catch (error){
        res.status(500).json({ message: 'There was a problem updating the posts' })
    }
})

router.delete("/id/:_id", async(req,res) => {
    try {
        const id = req.params._id
        const post = await Post.findByIdAndDelete(id)
        res.send({mensaje: 'Post eliminado'})
    } catch (error) {
        res.status(500).json({ message: 'There was a problem delete the post' })
    }
})






module.exports = router