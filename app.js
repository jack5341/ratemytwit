import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose"
import bodyParser from "body-parser"

import feedModel from "./models/auth.js"
import auth from "./routes/auth.js"
import feed from "./routes/feed.js"
import { CONSTANTS } from './config/constants.js';
import { authorization } from './middlewares/authorization.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use("/api", feed)
app.use("/auth", auth)

// app.use(function(err, req, res) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

app.post("/vote", authorization, async (req, res) => {
  const { postId } = req.body
  const { downVote, upVote, mehVote } = req.query
  const { _id } = req.user

  const post = await feedModel.findById(postId).exec()

  console.log(post);
  if (!post) {
    res.status(401).send()
    return
  }

  // switch (true) {
  //   case downVote:
  //     post.vote.downVote.push(_id)
  //     break;
  //   case upVote:

  //     break;

  //   case mehVote:

  //     break;

  //   default:
  //     break;
  // }

  res.status(200).send()
})

mongoose.connect(CONSTANTS.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connection established.'))
  .catch((error) => console.error("MongoDB connection failed:", error.message))

export default app

/* Endpoint list
    GET /api/feed -get all posts and pagination by query-
    POST /api/feed -sharing a post on feed-
    PUT /api/feed -edit shared post-
    DELETE /api/feed -delete shared post-
*/