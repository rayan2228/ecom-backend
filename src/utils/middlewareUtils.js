import { ACCESSTOKEN_SECRET } from "../constant.js";
import { User } from "../model/user.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import jwt from "jsonwebtoken";

export const verifyTokenAndGetUser = async (token) => {
    if (!token) throw new ApiError(401, "Unauthorized access");

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, ACCESSTOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Unauthorized access");
    }

    const user = await User.findById(decodedToken._id);
    if (!user) throw new ApiError(401, "Unauthorized access");

    return user;
};
