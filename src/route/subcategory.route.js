import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createSubcategory, getSubcategories, updateSubcategory, getSubcategory, deleteSubcategory, deleteManySubcategories } from "../controller/subcategory.controller.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"

const router = express.Router()

router.route("/subcategories").get(getSubcategories).post(auth, checkAccess(["admin"]), upload.single("thumbnail"), createSubcategory).delete(auth, checkAccess(["admin"]), deleteManySubcategories)
router.route("/subcategories/:name").get(getSubcategory).put(auth, checkAccess(["admin"]), upload.single("thumbnail"), updateSubcategory).delete(auth, checkAccess(["admin"]), deleteSubcategory)


export default router