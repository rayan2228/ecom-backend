import mongoose, { model, Schema } from "mongoose";

const productVariantSchema = new Schema(
  {
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
productVariantSchema.index({ size: 1, color: 1 }, { unique: true });
export const ProductVariant =
  mongoose.models.ProductVariant ||
  model("ProductVariant", productVariantSchema);
