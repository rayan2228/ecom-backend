import { Cart } from "../model/cart.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCart = TryCatch(async (req, res) => {
  const { product } = req.body;
  if (!product || !product.product || !product.price || !product.quantity) {
    throw new ApiError(
      400,
      "Valid product with price and quantity is required"
    );
  }
  const cartExist = await Cart.findOne({
    $and: [{ user: req.user._id }, { "items.product": product.product }],
  });
  let cart;
  if (cartExist) {
    // cart = await Cart.findOneAndUpdate(
    //   { user: req.user.product },
    //   {
    //     items: { $in: product, quantity: { $inc: 1 } },
    //     total: { $inc: product.price * product.quantity },
    //   },
    //   {
    //     new: true,
    //   }
    // );
    cart = await Cart.findOneAndUpdate(
      { user: req.user._id, "items.product": product.product },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      },
      { new: true }
    );
  } else {
    cart = await Cart.create({
      user: req.user._id,
      items: product,
      total: product.price * product.quantity,
    });
  }
  return res.json(new ApiSuccess(200, "cart created successfully", { cart }));
});
export { createCart };

