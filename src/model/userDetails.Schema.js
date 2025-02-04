import { model, models, Schema } from "mongoose";

const userDetailsSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserDetails =
  models.UserDetails || model("UserDetails", userDetailsSchema);
