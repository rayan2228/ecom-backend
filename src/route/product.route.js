import express from "express"
import { createProduct, deleteManyProducts, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.controller.js"
import { auth } from "../middleware/auth.middleware.js"
import { checkAccess } from "../middleware/checkAccess.middleware.js"
import { upload } from "../middleware/multer.middleware.js"
const router = express.Router()

router.route("/products").get(getProducts).post(auth, checkAccess(["admin"]), upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 }
]), createProduct).delete(auth, checkAccess(["admin"]), deleteManyProducts)

router.route("/products/:id").get(getProduct).put(auth, checkAccess(["admin"]), upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "images", maxCount: 5 }]), updateProduct).delete(auth, checkAccess(["admin"]), deleteProduct)


export default router