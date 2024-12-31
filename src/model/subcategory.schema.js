import { model, models, Schema } from "mongoose";

const subcategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    isActive: { type: Boolean, default: true },
    thumbnail: {
        publicId: String,
        url: String
    }
}, {
    timestamps: true
});
export const Subcategory = models.Subcategory || model("Subcategory", subcategorySchema);