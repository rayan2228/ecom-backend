import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createCategory, deleteCategory, getCategories, updateCategory, deleteManyCategories, getCategory } from "../controller/category.controller.js"
import { admin } from "../middleware/admin.middleware.js"
const router = express.Router()

router.route("/categories").get(getCategories).post(auth, admin, upload.single("thumbnail"), createCategory).delete(auth, admin, deleteManyCategories)
router.route("/categories/:name").get(getCategory).put(auth, admin, upload.single("thumbnail"), updateCategory).delete(auth, admin, deleteCategory)


export default router