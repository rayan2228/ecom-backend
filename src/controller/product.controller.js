import { Product } from "../model/product.schema .js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
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


const updateProduct = TryCatch(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        throw new ApiError(404, "product not found")
    }
    let { title, slug, description, category, subcategory, brand, isActive } = req.body
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
    const { thumbnail, images } = req.files
    if (thumbnail?.length) {
        const cloudinaryResult = await cloudinaryUpload(thumbnail[0].path, title, "product")
        product.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        }
    }
    if (images?.length) {
        const imagesResult = await Promise.all(images.map(image => cloudinaryUpload(image.path, title, "product")))
        product.images = imagesResult.map(image => ({
            publicId: image.public_id,
            url: image.optimizeUrl,
        }))
    }
    product.title = title
    product.slug = slug
    product.description = description
    product.category = category
    product.subcategory = subcategory
    product.brand = brand
    product.isActive = isActive
    await product.save()
    return res.json(new ApiSuccess(200, "product updated successfully", { product }))
})
const deleteProduct = TryCatch(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
        throw new ApiError(404, "product not found")
    }
    return res.json(new ApiSuccess(200, "product deleted successfully", { product }))
})

const deleteManyProducts = TryCatch(async (req, res) => {
    const { selectedProducts } = req.body
    const products = await Product.find({ _id: { $in: selectedProducts } })
    for (const product of products) {
        await product.deleteOne()
    }
    return res.json(new ApiSuccess(200, "products deleted successfully", {}))
})


export { createProduct, deleteProduct, deleteManyProducts, updateProduct }