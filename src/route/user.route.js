import express from "express"
import { createUser, mailVerification } from "../controller/user.controller.js"
const router = express.Router()

router.route("/users").post(createUser)
router.route("/users/verify/:token").get(mailVerification)

export default router