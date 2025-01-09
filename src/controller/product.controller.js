import { Product } from "../model/product.schema .js";
import { cloudinaryUpload } from "../service/cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";
const createProduct = TryCatch(async (req, res) => {
    let { title, slug, description, category, subcategory, brand, isActive } = req.body
    const { thumbnail, images } = req.files
    if (!title) {
        throw new ApiError(400, "title is required")
    }
    if (!slug) {
        slug = title.replaceAll(" ", "-").toLowerCase()
    }
    if (!description) {
        throw new ApiError(400, "description is required")
    }
    if (!category) {
        throw new ApiError(400, "category is required")
    }
    if (!subcategory) {
        throw new ApiError(400, "subcategory is required")
    }
    if (!thumbnail?.length) {
        throw new ApiError(400, "thumbnail is required")
    }
    const thumbnailResult = await cloudinaryUpload(thumbnail[0].path, title, "product")
    let imagesResult = await Promise.all(images.map(image => cloudinaryUpload(image.path, title, "product")))
    const product = await Product.create({
        title,
        slug,
        description,
        category,
        subcategory,
        brand,
        thumbnail: {
            publicId: thumbnailResult.public_id,
            url: thumbnailResult.optimizeUrl,
        },
        images: imagesResult.map(image => ({
            publicId: image.public_id,
            url: image.optimizeUrl,
        })),
        isActive
    })
    return res.status(201).json(new ApiSuccess(201, "product created successfully", { product }))
})

export { createProduct }