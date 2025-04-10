import express from "express";
import {
    changePassword,
    createUser,
    getUser,
    login,
    logout,
    mailVerification,
    refreshAccessToken,
    updateProfile,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.route("/users").get(auth, getUser).post(createUser);
router.route("/users/verify/:token").get(mailVerification);
router.route("/users/login").post(login);
router
  .route("/users/update")
  .post(auth, upload.single("avatar"), updateProfile);
router.route("/users/logout").get(auth, logout);
router.route("/users/changepassword").post(auth, changePassword);
router.route("/users/refreshaccessstoken").post(auth, refreshAccessToken);

export default router;
