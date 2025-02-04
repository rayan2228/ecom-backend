import mongoose, { model, models, Schema } from "mongoose";
const wishlistSchema = new Schema(
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

export const Wishlist = models.Wishlist || model("wishlist", wishlistSchema);
