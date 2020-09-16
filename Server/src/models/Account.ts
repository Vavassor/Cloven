import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

export const Account = mongoose.model("Account", AccountSchema);
