import express from "express"
import { createUser, login, mailVerification } from "../controller/user.controller.js"
const router = express.Router()

router.route("/users").post(createUser)
router.route("/users/verify/:token").get(mailVerification)
router.route("/users/login").post(login)

export default router