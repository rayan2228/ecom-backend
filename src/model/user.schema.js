import mongoose, { model, Schema } from "mongoose";
import { emailValidator } from "../utils/validator.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ACCESSTOKEN_EXPIRE, ACCESSTOKEN_SECRET, JWT_SECRET, REFRESHTOKEN_EXPIRE, REFRESHTOKEN_SECRET } from "../constant.js";
const userSchema = new Schema({
    displayname: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "username is required"],
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: emailValidator,
            message: "invalid email address"
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    avatar: {
        publicId: String,
        url: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    emailVerified: Date,
    refreshToken: String
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
})

userSchema.methods.mailVerificationToken = function () {
    try {
        return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username
        }, JWT_SECRET, { expiresIn: "5m" })
    } catch (error) {
        console.log(error);
    }
}
userSchema.methods.accessTokenGenerate = function () {
    try {
        return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            role: this.role
        }, ACCESSTOKEN_SECRET, { expiresIn: ACCESSTOKEN_EXPIRE })
    } catch (error) {
        console.log(error);
    }
}
userSchema.methods.refreshTokenGenerate = function () {
    try {
        return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            role: this.role
        }, REFRESHTOKEN_SECRET, { expiresIn: REFRESHTOKEN_EXPIRE })
    } catch (error) {
        console.log(error);
    }
}

export const User = mongoose.models.User || model("User", userSchema)