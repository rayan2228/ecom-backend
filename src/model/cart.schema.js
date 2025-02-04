import mongoose, { model, models, Schema } from "mongoose";
const cartSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant", // Reference to selected variation (color, size, etc.)
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }, // Price at the time of adding to cart
      },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Cart = models.Cart || model("Cart", cartSchema);
