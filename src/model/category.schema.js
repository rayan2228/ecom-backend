import mongoose, { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    thumbnail: {
        publicId: String,
        url: String
    },
}, {
    timestamps: true
});

export const Category = mongoose.models.Category || model("Category", categorySchema);