import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import logger from 'morgan';
import mongoose from "mongoose"
import bodyParser from "body-parser"

import auth from "./routes/auth.js"
import feed from "./routes/feed.js"

var app = express();

dotenv.config()
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use("/api", feed)
app.use("/auth", auth)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database connection...
mongoose.connect(process.env.DB_CONNECT, {
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