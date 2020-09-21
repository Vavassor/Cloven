import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
  access_token: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
});

export const Token = mongoose.model("Token", TokenSchema);
