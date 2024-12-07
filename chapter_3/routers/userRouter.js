import express from "express";
import {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
    protectRoute,
    login,
    signup,
    isAuthorised,
    forgetPassword,
    resetPassword,
    logout,
} from "../controller/userController.js";
const userRouter = express.Router();

// userRouter
//     .route("/")
//     .get(protectRoute, getUser)
//     .post(postUser)
//     .patch(updateUser)
//     .delete(deleteUser);

// userRouter.route("/getCookie").get(getCookies);
// userRouter.route("/setCookie").get(setCookies);

// userRouter.route("/:id").get(getUserById);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);

//user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/forgetPassword").post(forgetPassword);

userRouter.route("/resetPassword/:token").post(resetPassword);

//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

//admin specific functions
userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUsers);

export default userRouter;
