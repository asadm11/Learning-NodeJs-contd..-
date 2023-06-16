const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const { check, body } = require("express-validator");
const User = require("../models/user");

router.get("/login", authControllers.getLogin);
router.get("/signup", authControllers.getSignup);
router.post(
  "/login",
  [body("email").isEmail().withMessage("Please Enter a valid Email")],
  authControllers.postLogin
);
router.post("/logout", authControllers.postLogout);
router.post(
  "/signup",
  [
    check("email") //the express validator will expect check to return either true/false or an error or a promise
      .isEmail() //since user.findone is an async process, that's why we returned a promise.. the validator will wait for the promise to be resolved
      .withMessage("Please Enter a Valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      })
      .normalizeEmail()     //sanitising data (all lowercase) 
      .trim(),              //trim the xtra white spaces
    body("password", "Please enter a password with atleast 5 characters")
      .isLength({ min: 5 })
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match!!");
        }
        return true;
      })
      .trim(),
  ],
  authControllers.postSignup
); // this will add a validation middleware and also returns a middleware, which can be accessed through valildationResults(in controllers).
router.get("/reset", authControllers.getReset);
router.post("/reset", authControllers.postReset);
router.get("/reset/:token", authControllers.getNewPassword);
router.post("/new-password", authControllers.postNewPassword);

module.exports = router;
