import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    subcategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true }],
    brand: { type: String },
    thumbnail: { publicId: String, url: String },
    images: [{
        publicId: String,
        url: String
    }],
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

productSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            this.category.push("677d3b973bf4c62d15be82b5");
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
})

export const Product = models.Product || model("Product", productSchema);