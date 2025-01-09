import mongoose, { model, Schema } from "mongoose";

const productVariantSchema = new Schema({
    size: { type: String, required: true, default: null },
    color: { type: String, required: true, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, default: null },
}, {
    timestamps: true
});

export const ProductVariant = mongoose.models.ProductVariant || model("ProductVariant", productVariantSchema);