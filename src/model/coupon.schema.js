import { model, models, Schema } from "mongoose";

const couponSchema = new Schema({
    code: { type: String, unique: true, required: true },
    description: { type: String },
    discountType: { type: String, enum: ["percentage", "fixed"], required: true },
    discountValue: { type: Number, required: true },
    minimum_order_value: { type: Number, default: 0 },
    maximum_discount: { type: Number, default: null },
    appliesTo: {
        type: String,
        enum: ["all", "category", "product", "user"],
        default: "all",
    },
    applicableCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    applicableUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    usageLimit: { type: Number, default: null },
    usagePerUser: { type: Number, default: 1 },
    used_by: [
        {
            customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
            used_at: { type: Date, default: Date.now },
        }
    ],
    startDate: { type: Date },
    expiryDate: { type: Date },
    autoApply: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const Coupon = models.Coupon || model("Coupon", couponSchema);