import { model, Schema } from "mongoose";

const PostSchema = new Schema({
  account: {
    ref: "Account",
    required: true,
    type: Schema.Types.ObjectId,
  },
  content: {
    required: true,
    type: Schema.Types.String,
  },
  creation_date: {
    required: true,
    type: Schema.Types.Date,
  },
  title: {
    required: true,
    type: Schema.Types.String,
  },
});

export const Post = model("Post", PostSchema);
