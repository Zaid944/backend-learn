import express from "express";
import protectRoute from "./authHelper.js";
import {
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
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

//user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//profile page
userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);

// userRouter.route("/signup").post(signup);

// userRouter.route("/login").post(login);

//admin specific functions
// userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUsers);

export default userRouter;
