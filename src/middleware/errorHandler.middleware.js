import { ApiError } from "../utils/ApiErrors.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode || 500,
            status: false,
            message: err.message || "something went wrong",
            data: null
        })
    }
    return res.status(500).json({
        statusCode: 500,
        status: false,
        message: err.message,
        data: null,
    });
}