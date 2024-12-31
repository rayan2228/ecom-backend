import { verifyTokenAndGetUser } from "./middlewareUtils.js"; // Adjust the path as needed
import { TryCatch } from "../utils/TryCatch.js";

export const auth = TryCatch(async (req, _, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    req.user = await verifyTokenAndGetUser(token);
    next();
});
