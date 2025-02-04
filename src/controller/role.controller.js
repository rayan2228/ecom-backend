import { Role } from "../model/role.schema.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiSuccess } from "../utils/ApiSuccess.js"
import { TryCatch } from "../utils/TryCatch.js"
const createRole = TryCatch(async (req, res) => {
    const { name, description, permissions } = req.body
    if (!name) {
        throw new ApiError(400, "name is required")
    }
    if (permissions && permissions.length === 0) {
        throw new ApiError(400, "permissions is required")
    }
    const newRole = new Role({
        name,
        description,
        permissions
    })
    await newRole.save()
    return res.json(new ApiSuccess(200, "role created successfully", { newRole }))
})

const getRoles = TryCatch(async (req, res) => {
    const roles = await Role.find()
    return res.json(new ApiSuccess(200, "roles fetched successfully", { roles }))
})

export { createRole, getRoles };