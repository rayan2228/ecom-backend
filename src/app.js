import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { origin } from "./constant.js";
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cors({
    origin
}))
app.use(cookieParser())


import { errorHandler } from "./middleware/errorHandler.middleware.js";
import userRouter from "./route/user.route.js"
import categoryRouter from "./route/category.route.js"
import subCategoryRouter from "./route/subcategory.route.js"
import brandRouter from "./route/brand.route.js"
import productRouter from "./route/product.route.js"
import couponRouter from "./route/coupon.route.js"
import permissionRouter from "./route/permission.route.js"
import roleRouter from "./route/role.route.js"
app.use("/api/v1", userRouter)
app.use("/api/v1", categoryRouter)
app.use("/api/v1", subCategoryRouter)
app.use("/api/v1", brandRouter)
app.use("/api/v1", productRouter)
app.use("/api/v1", couponRouter)
app.use("/api/v1", permissionRouter)
app.use("/api/v1", roleRouter)


app.use(errorHandler)

app.get("/test", (_, res) => {
    res.json({ message: "hello world" })
})

app.all("*", (_, res) => {
    res.json({ message: "not found" })
})

export { app }