import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createCategory } from "../controller/category.controller.js"
const router = express.Router()

router.route("/category").post(auth, upload.single("thumbnail"), createCategory)


export default router