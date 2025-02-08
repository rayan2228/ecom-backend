import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { origin } from "./constant.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin,
  })
);
app.use(cookieParser());

import { errorHandler } from "./middleware/errorHandler.middleware.js";
import brandRouter from "./route/brand.route.js";
import cartRouter from "./route/cart.route.js";
import categoryRouter from "./route/category.route.js";
import compareRouter from "./route/compare.route.js";
import couponRouter from "./route/coupon.route.js";
import orderRouter from "./route/order.route.js";
import permissionRouter from "./route/permission.route.js";
import productRouter from "./route/product.route.js";
import roleRouter from "./route/role.route.js";
import subCategoryRouter from "./route/subcategory.route.js";
import userRouter from "./route/user.route.js";
import userDetailsRouter from "./route/userDetails.route.js";
import wishlistRouter from "./route/wishlist.route.js";
app.use("/api/v1", userRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", subCategoryRouter);
app.use("/api/v1", brandRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", couponRouter);
app.use("/api/v1", permissionRouter);
app.use("/api/v1", roleRouter);
app.use("/api/v1", wishlistRouter);
app.use("/api/v1", compareRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", userDetailsRouter);

app.get("/", (_, res) => {
  return res.json({ message: "hello world" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.all("*", (_, res) => {
  return res.sendFile(
    path.join(__dirname, "/views", "/errorViews", "/404.html")
  );
});

app.use(errorHandler);

export { app };

