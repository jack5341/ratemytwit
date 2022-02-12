import { Router } from "express";
import { authorization } from "../middlewares/authorization.js";
import feed from "../models/feed.js";

const route = Router()

/* 
    userToken String
    description String
    tweet String
    date Date
*/

route.post("/feed", authorization, async (req,res) => {
    const { description, tweet, userToken } = req.body

    if (!description && !tweet && !userToken) {
        res.status(400).send("description, user token and tweet is required arguments")
        return
    }

    if (description >= 280) {
        res.status(400).send("description should be less than 280 character")
        return
    }

    let post = new feed({
        userToken: userToken,
        tweet: tweet,
        description: description,
        date: Date.now()
    })

    await post.save()

    res.status(200).send("post is shared successfully.")
})

/*
    p - query = String
*/

route.get("/feed", async (req,res) => {
    const { p } = req.query
    const page = p || null
    const pageLimit = 10
    const posts = await feed.find({}).sort({ height: page, _id: page }).limit(pageLimit).exec()
    res.status(200).send(posts)
})

route.put("/feed", (req,res) => {

})

route.delete("/feed", (req,res) => {
    const { postId } = req.body

    if (!postId) {
        res.status(400).send("post id is required arguments")
        return
    }

    res.status(200).send()
}) 

export default route