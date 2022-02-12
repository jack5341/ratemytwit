import mongoose from "mongoose";

var feedPost = new mongoose.Schema({
    ownerId: {
      type: String,
      required: true
    },
    tweet: String,
    description: {
      type: String,
      maxlength: 280
    },
    usefullvote: String,
    mehvote: String,
    wtfvote: String,
    date: Date
});
  
export default mongoose.model("feed_posts", feedPost)