import { Category } from "../model/category.schema.js";
import { Product } from "../model/product.schema .js";
import { Subcategory } from "../model/subcategory.schema.js";
import { cloudinaryDelete, cloudinaryUpload } from "../service/cloudinary.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const getCategories = TryCatch(async (req, res) => {
  const categories = await Category.find();
  return res.json(
    new ApiSuccess(200, "categories fetched successfully", { categories })
  );
});

const getCategory = TryCatch(async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  if (!category) {
    throw new ApiError(404, "category not found");
  }
  return res.json(
    new ApiSuccess(200, "category fetched successfully", { category })
  );
});

const updateCategory = TryCatch(async (req, res) => {
  let { name, slug, description, isActive } = req.body;
  const category = await Category.findOne({ name: req.params.name });
  if (!category) {
    throw new ApiError(404, "category not found");
  }
  if (!name) {
    throw new ApiError(400, "name is required");
  }
  if (!slug) {
    slug = name.replaceAll(" ", "-").toLowerCase();
  }
  if (req.file) {
    if (category.thumbnail.public_id) {
      await cloudinaryDelete(category.thumbnail.public_id);
    }
    const thumbnail = req.file;
    const cloudinaryResult = await cloudinaryUpload(
      thumbnail.path,
      name,
      "category"
    );
    category.thumbnail = {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.optimizeUrl,
    };
  }
  category.name = name;
  category.slug = slug;
  category.description = description;
  category.isActive = isActive;
  await category.save();
  return res.json(
    new ApiSuccess(200, "category updated successfully", { category })
  );
});

const createCategory = TryCatch(async (req, res) => {
  const createdData = {};
  console.log(req.body);

  let { name, slug, description, isActive } = req.body;
  if (!name) {
    throw new ApiError(400, "name is required");
  }
  if (!slug) {
    slug = name.replaceAll(" ", "-").toLowerCase();
  } else {
    slug = slug.replaceAll(" ", "-").toLowerCase();
  }
  if (req.file) {
    const thumbnail = req.file;
    const cloudinaryResult = await cloudinaryUpload(
      thumbnail.path,
      name,
      "category"
    );
    createdData.thumbnail = {
      public_id: cloudinaryResult.public_id,
      url: cloudinaryResult.optimizeUrl,
    };
  }
  createdData.name = name;
  createdData.slug = slug;
  createdData.description = description || "";
  createdData.isActive = isActive || true;
  const category = await Category.create(createdData);
  return res
    .status(201)
    .json(new ApiSuccess(201, "category created successfully", { category }));
});

const deleteCategory = TryCatch(async (req, res) => {
  const category = await Category.findOne({ name: req.params.name });
  if (!category) {
    throw new ApiError(404, "category not found");
  }
  if (category.thumbnail.public_id) {
    await cloudinaryDelete(category.thumbnail.public_id);
  }
  await Subcategory.updateMany(
    { category: category._id },
    { $pull: { category: category._id } }
  );
  await Product.updateMany(
    { category: category._id },
    { $pull: { category: category._id } }
  );
  await category.deleteOne();
  return res.json(new ApiSuccess(200, "category deleted successfully", {}));
});

const deleteManyCategories = TryCatch(async (req, res) => {
  const { selectedCategories } = req.body;
  const categories = await Category.find({ name: { $in: selectedCategories } });
  for (const category of categories) {
    if (category.thumbnail.public_id) {
      await cloudinaryDelete(category.thumbnail.public_id);
    }
    await Subcategory.updateMany(
      { category: category._id },
      { $pull: { category: category._id } }
    );
    await Product.updateMany(
      { category: category._id },
      { $pull: { category: category._id } }
    );
    await category.deleteOne();
  }
  return res.json(new ApiSuccess(200, "categories deleted successfully", {}));
});
export {
  createCategory,
  deleteCategory,
  deleteManyCategories,
  getCategories,
  getCategory,
  updateCategory,
};
