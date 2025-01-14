import { ApiError } from "../utils/ApiErrors";
import { ApiSuccess } from "../utils/ApiSuccess";
import { TryCatch } from "../utils/TryCatch";

const createCoupon = TryCatch(async (req, res) => {
    const { code, description, discountType, discountValue, minimum_order_value, maximum_discount, appliesTo, applicableCategories, applicableProducts, applicableUsers, usageLimit, usagePerUser, used_by, startDate, expiryDate, autoApply, isActive } = req.body1

    if (!code) {
        throw new ApiError(400, "code is required")
    }
    if (!discountType) {
        throw new ApiError(400, "discountType is required")
    }

    if (!discountValue) {
        throw new ApiError(400, "discountValue is required")
    }

    if (Date(startDate) > Date(expiryDate)) {
        throw new ApiError(400, "startDate should be less than expiryDate")
    }

    const newCoupon = new Coupon({
        code,
        description,
        discountType,
        discountValue,
        minimum_order_value,
        maximum_discount,
        appliesTo,
        applicableCategories,
        applicableProducts,
        applicableUsers,
        usageLimit,
        usagePerUser,
        used_by,
        startDate,
        expiryDate,
        autoApply,
        isActive
    })

    await newCoupon.save()
    return res.json(new ApiSuccess(200, "coupon created successfully", { newCoupon }))

})

export { createCoupon }