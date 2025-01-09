import { Brand } from "../model/brand.schema"
import { TryCatch } from "../utils/TryCatch"

const getBrands = TryCatch(async (req, res) => {
    const brands = await Brand.find()
    return res.json(new ApiSuccess(200, "brands fetched successfully", { brands }))
})

const getBrand = TryCatch(async (req, res) => {
    const brand = await Brand.findOne({ name: req.params.name })
    if (!brand) {
        throw new ApiError(404, "brand not found")
    }
    return res.json(new ApiSuccess(200, "brand fetched successfully", { brand }))
})

const createBrand = TryCatch(async (req, res) => {
    const createdData = {}
    let { name, slug, description, isActive } = req.body
    if (!name) {
        throw new ApiError(400, "name is required")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    if (req.file) {
        const thumbnail = req.file
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "brand")
        createdData.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        }
    }
    createdData.name = name
    createdData.slug = slug
    createdData.description = description || ""
    createdData.isActive = isActive || true
    const brand = await Brand.create(createdData)
    return res.status(201).json(new ApiSuccess(201, "brand created successfully", { brand }))
})

export { createBrand, getBrands, getBrand }