import { Category } from "../model/category.schema.js";
import { Subcategory } from "../model/subcategory.schema.js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const getSubcategories = TryCatch(async (req, res) => {
    const subcategories = await Subcategory.find().populate("category")
    return res.json(new ApiSuccess(200, "subcategories fetched successfully", { subcategories }))
})

const updateSubcategory = TryCatch(async (req, res) => {
    let { name, slug, description, isActive } = req.body
    const category = await Category.findOne({ name: req.params.name })
    if (!category) {
        throw new ApiError(404, "category not found")
    }
    if (!name) {
        throw new ApiError(400, "name is required")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    if (req.file) {
        if (category.thumbnail.public_id) {
            await cloudinaryDelete(category.thumbnail.public_id)
        }
        const thumbnail = req.file
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "category")
        category.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        }
    }
    category.name = name
    category.slug = slug
    category.description = description
    category.isActive = isActive
    await category.save()
    return res.json(new ApiSuccess(200, "category updated successfully", { category }))
})

const createSubcategory = TryCatch(async (req, res) => {
    const createdData = {}
    let { name, slug, description, isActive, category } = req.body
    if (!name) {
        throw new ApiError(400, "name is required")
    }
    if (!category) {
        throw new ApiError(400, "Parent category is required");
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    if (req.file) {
        const thumbnail = req.file
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "category")
        createdData.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        }
    }

    createdData.name = name
    createdData.slug = slug
    createdData.description = description || ""
    createdData.isActive = isActive || true
    createdData.category = category
    const subcategory = await Subcategory.create(createdData)
    return res.status(201).json(new ApiSuccess(201, "subcategory created successfully", { subcategory }))
})

export { createSubcategory, getSubcategories, updateSubcategory }