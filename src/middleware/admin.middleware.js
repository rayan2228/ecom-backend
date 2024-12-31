import { verifyTokenAndGetUser } from "./middlewareUtils.js"; // Adjust the path as needed
import { TryCatch } from "../utils/TryCatch.js";
import { ApiError } from "../utils/ApiErrors.js";

export const admin = TryCatch(async (req, _, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    const user = await verifyTokenAndGetUser(token);

    if (user.role !== "admin") {
        throw new ApiError(401, "Unauthorized access");
    }

    req.user = user;
    next();
});
