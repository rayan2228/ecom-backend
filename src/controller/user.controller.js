import { JWT_SECRET, REFRESHTOKEN_SECRET } from "../constant.js"
import { verificationMail } from "../mail/verificationMail.js"
import { User } from "../model/user.schema.js"
import { cloudinaryUpload } from "../service/cloudinary.js"
import { sendMail } from "../service/mailService.js"
import { ApiError } from "../utils/ApiErrors.js"
import { ApiSuccess } from "../utils/ApiSuccess.js"
import { TryCatch } from "../utils/TryCatch.js"
import { passwordValidator } from "../utils/validator.js"
import jwt from "jsonwebtoken"


const generateTokens = async (_id) => {
    try {
        const user = await User.findById(_id)
        const accessToken = await user.accessTokenGenerate()
        const refreshToken = await user.refreshTokenGenerate()
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error, message);
    }
}



const createUser = TryCatch(async (req, res) => {
    const { displayname, username, email, password } = req.body
    if (Object.values(req.body).some((item) => item?.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }
    const isUsernameExist = await User.findOne({ username })
    if (isUsernameExist) {
        throw new ApiError(400, "username already exist")
    }
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        throw new ApiError(400, "email already exist")
    }
    if (!passwordValidator(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.")
    }
    const createdUser = await User.create({
        displayname,
        username,
        email,
        password
    })
    const user = await User.findById(createdUser._id).select("-password")
    const mailVerificationToken = user.mailVerificationToken()
    await sendMail(user.email, "Email Verification", "", verificationMail(user.displayname, mailVerificationToken))
    return res.status(201).json(new ApiSuccess(201, "user created successfully", { user }))
})

const mailVerification = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).send("Invalid token");
        }

        // Decode the token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(400).send("Invalid or expired token");
        }

        // Update the user's email verification status
        const user = await User.findByIdAndUpdate(
            { _id: decodedToken._id },
            { $set: { emailVerified: Date.now() } },
            { new: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send("mail verified");
    } catch (error) {
        console.error("mailVerification Error:", error);
        return res.status(500).send("An internal server error occurred");
    }
};

const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password || Object.values(req.body).some((item) => item.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // Find the user by email
    const isUser = await User.findOne({ email });
    if (!isUser) {
        throw new ApiError(404, "User not found");
    }

    // Check if the password is correct
    const isPasswordCorrect = await isUser.isPasswordCorrect(password);
    const user = await User.findById(isUser._id).select("-password")
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
    }
    res.cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
    // Successful login
    return res.json(new ApiSuccess(200, "Login successful", { user, accessToken, refreshToken }));
});


const updateProfile = TryCatch(async (req, res) => {
    if (req.file) {
        const avatar = req.file
        const clodinaryResult = await cloudinaryUpload(avatar.path, req.user.username, "avatar")
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                avatar: {
                    public_id: clodinaryResult.public_id,
                    url: clodinaryResult.optimizeUrl
                }
            }
        },
            {
                new: true
            }
        )
        return res.json(new ApiSuccess(200, "avatar updated", { user }))
    }
    if (req.body.displayname) {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                displayname: req.body.displayname
            }
        },
            {
                new: true
            }
        )
        return res.json(new ApiSuccess(200, "displayname updated", { user }))
    }
})


const logout = TryCatch(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: null
        }
    })
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    return res.json(new ApiSuccess(200, "Logout successful", {}))
})


const changePassword = TryCatch(async (req, res) => {
    const { password, oldPassword } = req.body
    if (Object.values(req.body).some((item) => item?.trim() === "")) {
        throw new ApiError(400, "all fields are required")
    }
    if (!passwordValidator(password)) {
        throw new ApiError(400, "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.")
    }
    const user = await User.findById(req.user._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid old password")
    }
    user.password = password
    await user.save()
    return res.json(new ApiSuccess(200, "Password updated", {}))
})

const refreshAccessToken = TryCatch(async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.headers.refreshToken
    if (!refreshToken) {
        throw new ApiError(401, "unauthorized access")
    }
    const decodedToken = jwt.verify(refreshToken, REFRESHTOKEN_SECRET)
    if (!decodedToken) {
        throw new ApiError(401, "unauthorized access")
    }
    const user = await User.findById(decodedToken._id)
    if (!user) {
        throw new ApiError(401, "unauthorized access")
    }
    const accessToken = await user.accessTokenGenerate()
    const options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
    }
    res.cookie("accessToken", accessToken, options)
    res.json(new ApiSuccess(200, "Access token refreshed", { accessToken }))
})


export { createUser, mailVerification, login, updateProfile, logout, changePassword, refreshAccessToken }