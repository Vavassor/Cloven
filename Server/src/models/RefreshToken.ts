import { model, Schema } from "mongoose";
import { Account } from "./Account";

const RefreshTokenSchema = new Schema({
  account_id: {
    ref: Account,
    required: true,
    type: Schema.Types.ObjectId,
  },
  client_id: {
    required: true,
    type: String,
  },
});

export const RefreshToken = model("RefreshToken", RefreshTokenSchema);
