import { Router } from "express";
import feed from "../models/feed.js";

const route = Router()

/* 
    userToken string
    description string
    tweet string
    date Date
*/

route.post("/feed", async (req,res) => {
    const { description, tweet, userToken } = req.body

    if (!description && !tweet && !userToken) {
        res.status(400).send("description, user token and tweet is required arguments")
        return
    }

    if (description >= 280) {
        res.status(400).send("description should be less than 280 character")
        return
    }

    let post = feed({
        userToken: userToken,
        tweet: tweet,
        description: description,
        date: Date.now()
    })

    await post.save()

    res.status(200).send("post is shared successfully.")
})

/* 
    p - query = string
*/

route.get("/feed", async (req,res) => {
    const { p } = req.query
    const posts = await feed.find({}).exec()

    // will implement pagination algorithm to here.
    res.status(200).send(posts)
})

route.put("/feed", (req,res) => {

})

route.delete("/feed", (req,res) => {

})

export default route