import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import logger from 'morgan';
import mongoose from "mongoose"

import feed from "./routes/feed"

var app = express();

dotenv.config()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", feed)

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
mongoose.connect( process.env.DB_CONNECT, 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
             .then(() => console.log( 'Database Connected' ))
             .catch(err => console.log( err ));    

module.exports = app;

/* Endpoint list
    POST /api/feed -sharing a post on feed-
    PUT /api/feed -edit shared post-
    DELETE /api/feed -delete shared post-
*/