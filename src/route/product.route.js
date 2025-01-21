import express from "express"
import { upload } from "../middleware/multer.middleware.js"
import { auth } from "../middleware/auth.middleware.js"
import { createProduct, deleteManyProducts, deleteProduct, updateProduct } from "../controller/product.controller.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
const router = express.Router()

router.route("/products").post(auth, checkAccess(["admin"]), upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
]), createProduct).delete(auth, checkAccess(["admin"]), deleteManyProducts)

router.route("/products/:id").put(auth, checkAccess(["admin"]), upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "images", maxCount: 5 }]), updateProduct).delete(auth, checkAccess(["admin"]), deleteProduct)


export default router