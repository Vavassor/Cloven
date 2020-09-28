import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const Post = model("Post", PostSchema);
