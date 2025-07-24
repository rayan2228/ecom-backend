import { Cart } from "../model/cart.schema.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCart = TryCatch(async (req, res) => {
  const { product, quantity } = req.body;
  // if (!product || !product.product || !product.price || !product.quantity) {
  //   throw new ApiError(
  //     400,
  //     "Valid product with price and quantity is required"
  //   );
  // }
  const cartAndProductExist = await Cart.findOne({
    $and: [{ user: req.user._id }, { "items.product": product }],
  });
  const cartExist = await Cart.findOne({ user: req.user._id });
  let cart;
  if (cartAndProductExist) {
    cart = await Cart.findOneAndUpdate(
      { user: req.user._id, "items.product": product },
      {
        $inc: {
          "items.$.quantity": quantity,
          total: product.price * quantity,
        },
      },
      { new: true }
    );
  } else if (cartExist) {
    cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          items: {
            product: product,
            quantity: quantity,
            price: product.price,
          },
        },
        $inc: {
          total: product.price * quantity,
        },
      },
      { new: true }
    );
  } else {
    await Cart.create({
      user: req.user._id,
      items: [
        {
          product: product,
          quantity: quantity,
          price: product.price,
        },
      ],
      total: product.price * quantity,
    });
  }
  console.log("cart", cart);
  return res.json(new ApiSuccess(200, "cart created successfully", { cart }));
});

const getCarts = TryCatch(async (req, res) => {
  const carts = await Cart.find({ user: req.user._id });
  return res.json(new ApiSuccess(200, "carts found successfully", { carts }));
});

const updateCart = TryCatch(async (req, res) => {
  const { selectedItems } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: { $in: selectedItems } } } },
    { new: true }
  );
  return res.json(new ApiSuccess(200, "cart updated successfully", { cart }));
});

const incrementItemQuantity = TryCatch(async (req, res) => {
  const { product } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id, "items.product": product.product },
    {
      $inc: {
        "items.$.quantity": 1,
      },
    },
    { new: true }
  );
  return res.json(new ApiSuccess(200, "cart updated successfully", { cart }));
});

export { createCart, getCarts, incrementItemQuantity, updateCart };

