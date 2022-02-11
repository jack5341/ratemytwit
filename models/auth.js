import mongoose from "mongoose";

var authenticationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 32
    },
    password: {
        type: String,
        required: true,
    }
});
  
export default mongoose.model("authentications", authenticationSchema)