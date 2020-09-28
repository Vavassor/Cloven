import { model, Schema } from "mongoose";

const AppSchema = new Schema({
  client_id: {
    required: true,
    type: String,
    unique: true,
  },
  client_secret: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  redirect_uri: {
    required: true,
    type: String,
  },
  website: {
    required: true,
    type: String,
  },
});

export const App = model("App", AppSchema);
