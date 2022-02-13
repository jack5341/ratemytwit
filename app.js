import express from 'express';
import mongoose from "mongoose"
import bodyParser from "body-parser"

import feedModel from "./models/auth.js"
import auth from "./routes/auth.js"
import feed from "./routes/feed.js"
import { CONSTANTS } from './config/constants.js';
import { authorization } from './middlewares/authorization.js';

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api", feed)
app.use("/auth", auth)

app.post("/vote", authorization, async (req, res) => {
  const { postId } = req.body
  const { downVote, upVote, mehVote } = req.query
  const { _id } = req.user

  const post = await feedModel.findById(postId).exec()

  if (!post) {
    res.status(401).send()
    return
  }

  res.status(200).send()
})

mongoose.connect(CONSTANTS.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connection established.'))
  .catch((error) => console.error("MongoDB connection failed:", error.message))

export default app