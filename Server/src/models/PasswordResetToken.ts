import { model, Schema } from "mongoose";

const PasswordResetTokenSchema = new Schema({
  account_id: {
    ref: "Account",
    required: true,
    type: Schema.Types.ObjectId,
  },
  expiration_date: {
    required: true,
    type: Schema.Types.Date,
  },
  token: {
    required: true,
    type: Schema.Types.String,
  },
});

export const PasswordResetToken = model(
  "PasswordResetToken",
  PasswordResetTokenSchema
);
