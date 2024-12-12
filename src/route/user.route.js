import express from "express"
import { createUser, login, mailVerification, updateProfile } from "../controller/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
const router = express.Router()

router.route("/users").post(createUser)
router.route("/users/verify/:token").get(mailVerification)
router.route("/users/login").post(login)
router.route("/users/update").post(upload.single("avatar"), updateProfile)

export default router