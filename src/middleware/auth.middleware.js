import { ACCESSTOKEN_SECRET } from "../constant.js";
import { User } from "../model/user.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";
import jwt from "jsonwebtoken"
export const auth = TryCatch(async (req, _, next) => {
    console.log(req.cookies);
    
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "unauthorized access")
    }
    const decodedToken = jwt.verify(token, ACCESSTOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(401, "unauthorized access")
    }
    const user = await User.findById(decodedToken._id)
    if (!user) {
        throw new ApiError(401, "unauthorized access")
    }
    req.user = user
    next()
})