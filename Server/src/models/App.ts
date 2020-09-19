import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AppSchema = new Schema({
  clientId: {
    required: true,
    type: String,
    unique: true,
  },
  clientSecret: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  redirectUri: {
    required: true,
    type: String,
  },
  website: {
    required: true,
    type: String,
  },
});

export const App = mongoose.model("App", AppSchema);
