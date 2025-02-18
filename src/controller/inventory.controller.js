import { cloudinaryUpload } from "../service/cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";

const createInventory = TryCatch(async (req, res) => {
  const {
    product,
    variant,
    purchasePrice,
    sellingPrice,
    discount,
    stock,
    inStock,
    sku,
    reservedStock,
    location,
  } = req.body;
  if (
    [product, variant, purchasePrice, sellingPrice, sku].some(
      (item) => !item?.trim()
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }
  const { images } = req.files;
  const cloudinaryResult = await Promise.all(
    images.map((image) => cloudinaryUpload(image.path, sku, "inventory"))
  );

  const inventory = await Inventory.create({
    product,
    variant,
    purchasePrice,
    sellingPrice,
    discount,
    stock,
    inStock,
    sku,
    reservedStock,
    location,
    images: cloudinaryResult.map((image) => ({
      publicId: image.public_id,
      url: image.optimizeUrl,
    })),
  });
  return res
    .status(201)
    .json(new ApiSuccess(201, "inventory created", { inventory }));
});

export { createInventory };

