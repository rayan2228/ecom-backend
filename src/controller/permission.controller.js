import { Permission } from "../model/permissionSchema.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const getPermissions = async (req, res) => {
    const permissions = await Permission.find();
    return res.json(new ApiSuccess(200, "permissions fetched successfully", { permissions }));
}

export { createPermission, getPermissions };