import { JWT_SECRET } from "../constant.js";
import { User } from "../model/user.schema.js";
import { ApiError } from "../utils/ApiErrors";
import { TryCatch } from "../utils/TryCatch";
import jwt from "jsonwebtoken"
export const auth = TryCatch(async (req, res, next) => {
    const token = req.cookies("accessToken") || req.headers.authorization
    if (!token) {
        return new ApiError(401, "unauthorized access")
    }
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if (!decodedToken) {
        return new ApiError(401, "unauthorized access")
    }
    const user = await User.findById(decodedToken._id)
    if (!user) {
        return new ApiError(401, "unauthorized access")
    }
    res.user = user
    next()
})