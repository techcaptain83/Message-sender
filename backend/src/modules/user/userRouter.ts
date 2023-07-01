import express = require("express");
import isAuthenticated from "../../middlewares/auth";
import {
    updateApiKey,
    updatePassword,
    updateProfile, 
    updatePromoCode,
    resetPassword,
    validateVerificationCode,
    sendVerificationCode
} from "./userController";
import { getStats } from "./statsController"
import { findUserByPromoCode } from "./userService";

const router = express.Router();

router.put("/update", isAuthenticated, updateProfile);
router.put("/update-password", isAuthenticated, updatePassword);
router.get("/update-api-key", isAuthenticated, updateApiKey);
router.get("/find-by-promocode", isAuthenticated, findUserByPromoCode);
router.put("/update-promo-code", isAuthenticated, updatePromoCode);
router.get("/get-stats", getStats);
router.post("/send-verification-code",sendVerificationCode);
router.post("/reset-password",resetPassword);
router.post("/validate-verification-code",validateVerificationCode);

export default router;