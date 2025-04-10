import { ApiError } from "../utils/ApiErrors.js";
import { TryCatch } from "../utils/TryCatch.js";

export const checkAccess = function (permissions = []) {
  return TryCatch(async (req, res, next) => {
    const user = req.user;
    
    const userPermissions = user.role
    .map((role) => role.permissions)
    .flat()
    .map((permission) => permission.name);
    
    
    const hasPermission = permissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ApiError(403, "Unauthorized access");
    }
    next();
  });
};
