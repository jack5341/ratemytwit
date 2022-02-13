import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import feed from "../models/feed.js";

const route = Router()

route.post("/feed", authorization, async (req,res) => {
    const { description, tweet, ownerId } = req.body

    // Use HTTP Validation libraries
    if (!description && !tweet && !ownerId) {
        res.status(400).send("description, user token and tweet is required arguments")
        return
    }

    const descriptionLimit = 280

    if (description >= descriptionLimit) {
        res.status(400).send("description should be less than 280 character")
        return
    }

    const post = new feed({
        ownerId: ownerId,
        tweet: tweet,   
        description: description,
        date: Date.now()
    })

    await post.save()

    res.status(200).send(post)
})

route.get("/feed", async (req,res) => {
    const { p } = req.query
    const page = p || 0
    const pageLimit = 10
    const posts = await feed.find({}).sort({ height: page, _id: page }).limit(pageLimit).exec()
    res.status(200).send(posts)
})

route.put("/feed", authorization, async (req,res) => {
    const { postId } = req.query
    const { description, tweet } = req.body
    const user = req.user

    const post = await feed.findById(postId).exec()

    if (!post) {
        res.status(404).send("the post could not found in database")
        return
    }

    if (post.ownerId != user._id) {
        res.status(401).send("you are not owner of this post")
        return
    } 

    let updatedPost = {}

    if (tweet) {
        updatedPost.tweet = tweet
    }

    if (description) {
        updatedPost.description = description
    }
    
    await feed.updateOne(updatedPost)
    res.status(200).send(true)
})

route.delete("/feed", authorization, async (req,res) => {
    const { postId } = req.query
    const user = req.user

    if (!postId) {
        res.status(400).send("post id is required arguments")
        return
    }

    const post = await feed.findById(postId).exec()

    if (!post) {
        res.status(404).send("the post could not found in database")
        return
    }

    if (post.ownerId != user._id) {
        res.status(401).send("you are not owner of this post")
        return
    } 

    await feed.findByIdAndDelete(postId)

    res.status(200).send(true)
}) 

export default route