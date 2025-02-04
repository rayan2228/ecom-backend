import mongoose, { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variation",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refunded",
      ],
      default: "Pending",
    },
    isShipping: Boolean,
    shippingAddress: {
      shippingFullName: { type: String, required: true },
      shippingAddress: { type: String, required: true },
      shippingCity: { type: String, required: true },
      shippingPostalCode: { type: String, required: true },
      shippingCountry: { type: String, required: true },
    },
    trackingNumber: { type: String, default: null, unique: true },
    orderNotes: String,
    // vendor: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Vendor who sold the product
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", Order);
