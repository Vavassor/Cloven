import { model, Schema } from "mongoose";
import { RefreshToken } from "./RefreshToken";

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

export const Account = model("Account", AccountSchema);

AccountSchema.post("deleteOne", async (account) => {
  await RefreshToken.deleteMany({ account_id: account._id });
});
