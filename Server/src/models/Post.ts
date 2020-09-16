import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creation_time: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("Post", PostSchema);
