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
import multer from "multer";
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

//multer for file upload
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "file where image is there");
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`);
    },
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: filter,
});



export default userRouter;
