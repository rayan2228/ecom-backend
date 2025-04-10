import express from "express"
import { createCategory, deleteCategory, deleteManyCategories, getCategories, getCategory, updateCategory } from "../controller/category.controller.js"
import { auth } from "../middleware/auth.middleware.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router
  .route("/categories")
  .get(getCategories)
  .post(
    auth,
    checkAccess(["manage_categories"]),
    upload.single("thumbnail"),
    createCategory
  )
  .delete(auth, checkAccess(["manage_categories"]), deleteManyCategories);
router
  .route("/categories/:name")
  .get(getCategory)
  .put(
    auth,
    checkAccess(["manage_categories"]),
    upload.single("thumbnail"),
    updateCategory
  )
  .delete(auth, checkAccess(["manage_categories"]), deleteCategory);


export default router