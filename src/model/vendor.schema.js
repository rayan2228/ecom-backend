import { model, models, Schema } from "mongoose";

const vendorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    address: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: true
});

export const Vendor = models.Vendor || model("Vendor", vendorSchema);