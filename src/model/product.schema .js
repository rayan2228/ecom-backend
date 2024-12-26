import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: String },
    images: [{
        publicId: String,
        url: String
    }],
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" }],
}, { timestamps: true });

export const Product = models.Product || model("Product", productSchema);