import { model, models, Schema } from "mongoose";

const productVariantSchema = new Schema({
    size: { type: String, required: true, default: null },
    color: { type: String, required: true, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true, default: null },
}, {
    timestamps: true
});

export const ProductVariant = models.ProductVariant || model("ProductVariant", productVariantSchema);