import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { admin } from "../middleware/admin.middleware.js"
import { createProduct, deleteManyProducts } from "../controller/product.controller.js"
const router = express.Router()

router.route("/products").post(auth, admin, upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
]), createProduct).delete(auth, admin, deleteManyProducts)

router.route("/products/:id").delete(auth, admin, deleteProduct)


export default router