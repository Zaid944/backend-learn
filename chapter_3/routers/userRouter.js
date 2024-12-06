import express from "express";
import userModel from "../models/userModel.js";
import protectRoute from "./authHelper.js";
const userRouter = express.Router();

userRouter
    .route("/")
    .get(protectRoute, getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route("/getCookie").get(getCookies);
userRouter.route("/setCookie").get(setCookies);

userRouter.route("/:id").get(getUserById);

async function getUser(req, res) {
    console.log(req.query);
    let allUsers = await userModel.find();

    // let allUsers = await userModel.findOne({name: 'Zaid'});

    res.json({
        message: "list of all users",
        data: allUsers,
    });
    // res.send(users);
}

function postUser(req, res) {
    console.log("req.body", req.body);
    console.log("here");
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "updated successfully",
    });
}

async function updateUser(req, res) {
    // console.log("req.body", req.body);
    // console.log("here");
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate(
        { email: "zaid25akhter@gmail.com" },
        dataToBeUpdated
    );
    // for (key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }
    res.json({
        message: "updated successfully",
        user,
    });
}

async function deleteUser(req, res) {
    // users = {};
    let user = await userModel.findOneAndDelete({
        email: "zaid25akhter@gmail.com",
    });

    res.json({
        message: "data deleted successfully",
        user,
    });
}

function getUserById(req, res) {
    console.log("params is", req.params);
    res.send(req.params.id);
}

function setCookies(req, res) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true");
    //httpOnly -> can't be accessed from frontend
    res.cookie("isLoggedIn", false);
    res.send("cookies has been set");
}

function getCookies(req, res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send("cookies recieved");
}

export default userRouter;
