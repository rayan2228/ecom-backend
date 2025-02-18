import mongoose, { model, Schema } from "mongoose";
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
cartSchema.pre("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});
export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
