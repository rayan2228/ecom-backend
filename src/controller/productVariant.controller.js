
import { ProductVariant } from "../model/productVariant.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const createVariant = TryCatch(async (req, res) => {
  const { size, color, category } = req.body;
  if (!(!size || !color)) {
    throw new ApiError(400, "size or color is required");
  }
  if (size) {
    if (!category) {
      throw new ApiError(400, "category is required");
    }
  }
  const variant = await ProductVariant.create({ size, color, category });
  return res.json(
    new ApiSuccess(201, "variant created successfully", { variant })
  );
});
export { createVariant };

