import express from "express";
import {
    middleware1,
    middleware2,
    getSignup,
    postSignup,
    loginUser,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter
    .route("/signup")
    .get(middleware1, getSignup, middleware2)
    .post(postSignup);

authRouter.route("/login").post(loginUser);

export default authRouter;
