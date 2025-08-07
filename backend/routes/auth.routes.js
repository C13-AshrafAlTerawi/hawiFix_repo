const express = require("express");
const router = express.Router();
authController = require("../controllers/auth.controller");
const passport = require("passport");

router.post("/register", authController.register);

router.post("/login", authController.login);

// تسجيل الدخول أو التسجيل باستخدام جوجل
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

// رد جوجل بعد تسجيل الدخول (تسجيل الدخول أو التسجيل في نفس المسار)
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authController.loginGoogle // أو authController.registerGoogle بناءً على الحاجة
);
module.exports = router;
