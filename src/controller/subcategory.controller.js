import { Product } from "../model/product.schema .js";
import { Subcategory } from "../model/subcategory.schema.js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const getSubcategories = TryCatch(async (req, res) => {
    const subcategories = await Subcategory.find().populate("category")
    return res.json(new ApiSuccess(200, "subcategories fetched successfully", { subcategories }))
})

const getSubcategory = TryCatch(async (req, res) => {
    const subcategory = await Subcategory.findOne({ name: req.params.name }).populate("category")
    if (!subcategory) {
        throw new ApiError(404, "subcategory not found")
    }
    return res.json(new ApiSuccess(200, "subcategory fetched successfully", { subcategory }))
})

const updateSubcategory = TryCatch(async (req, res) => {
    let { name, slug, description, isActive, category } = req.body
    const subcategory = await Subcategory.findOne({ name: req.params.name })
    if (!subcategory) {
        throw new ApiError(404, "subcategory not found")
    }
    if (!name) {
        throw new ApiError(400, "name is required")
    }
    if (!slug) {
        slug = name.replaceAll(" ", "-").toLowerCase()
    }
    if (req.file) {
        if (subcategory.thumbnail.public_id) {
            await cloudinaryDelete(subcategory.thumbnail.public_id)
        }
        const thumbnail = req.file
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "subcategory")
        subcategory.thumbnail = {
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.optimizeUrl,
        }
    }
    subcategory.name = name
    subcategory.slug = slug
    subcategory.description = description
    subcategory.isActive = isActive
    if (category) {
        subcategory.category.push(category)
    }
    await subcategory.save()
    return res.json(new ApiSuccess(200, "subcategory updated successfully", { subcategory }))
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
        const cloudinaryResult = await cloudinaryUpload(thumbnail.path, name, "subcategory")
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

const deleteSubcategory = TryCatch(async (req, res) => {
    const subcategory = await Subcategory.findOne({ name: req.params.name })
    if (!subcategory) {
        throw new ApiError(404, "subcategory not found")
    }
    if (subcategory.thumbnail.public_id) {
        await cloudinaryDelete(subcategory.thumbnail.public_id)
    }
    await Product.updateMany({ subcategory: subcategory._id }, { $pull: { subcategory: subcategory._id } })
    await subcategory.deleteOne()
    return res.json(new ApiSuccess(200, "subcategory deleted successfully", {}))
})

const deleteManySubcategories = TryCatch(async (req, res) => {
    const { selectedSubcategories } = req.body
    const subcategories = await Subcategory.find({ name: { $in: selectedSubcategories } })
    for (const subcategory of subcategories) {
        if (subcategory.thumbnail.public_id) {
            await cloudinaryDelete(subcategory.thumbnail.public_id)
        }
        await Product.updateMany({ subcategory: subcategory._id }, { $pull: { subcategory: subcategory._id } })
        await subcategory.deleteOne()
    }
    return res.json(new ApiSuccess(200, "subcategories deleted successfully", {}))
})


export { createSubcategory, getSubcategories, updateSubcategory, getSubcategory, deleteSubcategory, deleteManySubcategories }