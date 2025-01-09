import mongoose, { model, Schema } from "mongoose";

const brandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    thumbnail: {
        publicId: String,
        url: String
    }
}, {
    timestamps: true
});

export const Brand = mongoose.models.Brand || model("Brand", brandSchema);