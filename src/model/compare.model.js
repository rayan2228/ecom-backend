import mongoose, { model, models, Schema } from "mongoose";
const compareSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Compare = models.Compare || model("Compare", compareSchema);
