
import { TryCatch } from "../utils/TryCatch.js";
import { ApiError } from "../utils/ApiErrors.js";
import { verifyTokenAndGetUser } from "../utils/middlewareUtils.js";

export const checkAccess = function (roles = [], permissions = []) {
    return TryCatch(async (req, res, next) => {
        const user = req.user
        const userRoles = user.roles.map(role => role.name)
        const userPermissions = user.roles.map(role => role.permissions).flat().map(permission => permission.name)

        const hasRole = roles.some(role => userRoles.includes(role))
        const hasPermission = permissions.some(permission => userPermissions.includes(permission))

        if (!hasRole || !hasPermission) {
            throw new ApiError(403, "Unauthorized access")
        }
        next()
    })
}
