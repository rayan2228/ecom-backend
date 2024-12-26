import { model, models, Schema } from "mongoose";

const productInventorySchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant", required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    discount: { discountType: String, discountValue: Number },
    stock: { type: Number, default: 0 },
    inStock: { type: Boolean, default: false },
    sku: { type: String, unique: true, required: true },
    images: [String],
}, {
    timestamps: true
});

export const ProductInventory = models.ProductInventory || model("ProductInventory", productInventorySchema);
