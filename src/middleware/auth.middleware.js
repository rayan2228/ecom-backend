 // Adjust the path as needed
import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";
import { TryCatch } from "../utils/TryCatch.js";

export const auth = TryCatch(async (req, _, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    req.user = await verifyTokenAndGetUser(token);
    next();
});
