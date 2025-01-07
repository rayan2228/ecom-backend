import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { createSubcategory, getSubcategories, updateSubcategory, getSubcategory, deleteSubcategory, deleteManySubcategories } from "../controller/subcategory.controller.js"

const router = express.Router()

router.route("/subcategories").get(getSubcategories).post(auth, admin, upload.single("thumbnail"), createSubcategory).delete(auth, admin, deleteManySubcategories)
router.route("/subcategories/:name").get(getSubcategory).put(auth, admin, upload.single("thumbnail"), updateSubcategory).delete(auth, admin, deleteSubcategory)


export default router