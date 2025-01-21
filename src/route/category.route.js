import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createCategory, deleteCategory, getCategories, updateCategory, deleteManyCategories, getCategory } from "../controller/category.controller.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"

const router = express.Router()

router.route("/categories").get(getCategories).post(auth, checkAccess(["admin"]), upload.single("thumbnail"), createCategory).delete(auth, checkAccess(["admin"]), deleteManyCategories)
router.route("/categories/:name").get(getCategory).put(auth, checkAccess(["admin"]), upload.single("thumbnail"), updateCategory).delete(auth, checkAccess(["admin"]), deleteCategory)


export default router