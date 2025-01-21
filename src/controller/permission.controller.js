import Permission from "../models/Permission.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
const createPermission = async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        throw new ApiError(400, "name is required");
    }
    const newPermission = new Permission({
        name,
        description
    });
    await newPermission.save();
    return res.json(new ApiSuccess(200, "permission created successfully", { newPermission }));
}

const getPermissions = async (req, res) => {
    const permissions = await Permission.find();
    return res.json(new ApiSuccess(200, "permissions fetched successfully", { permissions }));
}