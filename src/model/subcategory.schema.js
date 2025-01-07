import mongoose, { model, Schema } from "mongoose";

const subcategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],
    isActive: { type: Boolean, default: true },
    thumbnail: {
        publicId: String,
        url: String
    }
}, {
    timestamps: true
});

subcategorySchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            this.category.push("677d3b973bf4c62d15be82b5");
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});


export const Subcategory = mongoose.models.Subcategory || model("Subcategory", subcategorySchema);