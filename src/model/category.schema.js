import { model, models, Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const Category = models.Category || model("Category", categorySchema);