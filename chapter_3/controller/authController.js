import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import JWT_KEY from "../secrets.js";

export function getSignup(req, res, next) {
    res.sendFile("/views/index.html", { root: __dirname });
    next();
}

export async function postSignup(req, res) {
    let obj = req.body;
    // console.log(obj);
    let data = await userModel.create(obj);
    // console.log("frontend to backend using axios", obj);
    // const user = new userModel({
    //     name: "Zaid",
    //     email: "abjddwwhjjjdjdjd@gmail.com",
    //     password: "1234455544",
    //     confirmPassword: "1234455544",
    // });
    // user.save();
    res.json({
        message: "user signed up",
        data,
    });
}

export function middleware1(req, res, next) {
    console.log("middleware1 called");
    next();
}

export function middleware2(req, res) {
    console.log("middleware2 called");
}

export async function loginUser(req, res) {
    let { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        if (email) {
            let user = await userModel.findOne({ email: email });
            if (user) {
                //bcrypt
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    // res.cookie("isLoggedIn", true);
                    let payload = user["_id"];
                    let login = jwt.sign({ payload: payload }, JWT_KEY);
                    res.cookie("login", login);
                    return res.json({
                        message: "user logged in successfully",
                    });
                } else {
                    return res.json({
                        message: "password doesn't match",
                    });
                }
            } else {
                return res.json({
                    message: "user not found",
                });
            }
        } else {
            return res.json({
                message: "empty email",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message(),
        });
    }
}
