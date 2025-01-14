import { Coupon } from "../model/coupon.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";
import { TryCatch } from "../utils/TryCatch.js";

const createCoupon = TryCatch(async (req, res) => {
    const { code, description, discountType, discountValue, minimum_order_value, maximum_discount, appliesTo, applicableCategories, applicableProducts, applicableUsers, usageLimit, usagePerUser, used_by, startDate, expiryDate, autoApply, isActive } = req.body

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


const getCoupons = TryCatch(async (req, res) => {
    const coupons = await Coupon.find()
    return res.json(new ApiSuccess(200, "coupons fetched successfully", { coupons }))
})

const getCoupon = TryCatch(async (req, res) => {
    const coupon = await Coupon.findOne({ code: req.params.code })
    if (!coupon) {
        throw new ApiError(404, "coupon not found")
    }
    return res.json(new ApiSuccess(200, "coupon fetched successfully", { coupon }))
})


const deleteCoupon = TryCatch(async (req, res) => {
    const coupon = await Coupon.findOneAndDelete({ code: req.params.code })
    if (!coupon) {
        throw new ApiError(404, "coupon not found")
    }
    return res.json(new ApiSuccess(200, "coupon deleted successfully", { coupon }))
})

const deleteSelectedCoupons = TryCatch(async (req, res) => {
    const { selectedCoupons } = req.body
    const coupons = await Coupon.find({ _id: { $in: selectedCoupons } })
    for (const coupon of coupons) {
        await coupon.deleteOne()
    }
    return res.json(new ApiSuccess(200, "coupons deleted successfully", {}))
})

const updateCoupon = TryCatch(async (req, res) => {
    const { code, description, discountType, discountValue, minimum_order_value, maximum_discount, appliesTo, applicableCategories, applicableProducts, applicableUsers, usageLimit, usagePerUser, used_by, startDate, expiryDate, autoApply, isActive } = req.body
    const coupon = await Coupon.findOne({ code: req.params.code })
    if (!coupon) {
        throw new ApiError(404, "coupon not found")
    }
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
    const updatedCoupon = new Coupon({
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

    await updatedCoupon.save()
    return res.json(new ApiSuccess(200, "coupon updated successfully", { updatedCoupon }))
})

export { createCoupon, getCoupons, getCoupon, deleteCoupon, deleteSelectedCoupons,updateCoupon }