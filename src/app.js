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


import userRouter from "./route/user.route.js"
import { errorHandler } from "./middleware/errorHandler.middleware.js";

app.use("/api/v1", userRouter)

app.use(errorHandler)

app.get("/test", (_, res) => {
    res.json({ message: "hello world" })
})

app.all("*", (_, res) => {
    res.json({ message: "not found" })
})

export { app }