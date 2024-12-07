import userModel from "../models/userModel.js";
import JWT_KEY from "../secrets.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongodb from "mongodb";

// export async function getUser(req, res) {
//     console.log(req.query);
//     let allUsers = await userModel.find();

//     // let allUsers = await userModel.findOne({name: 'Zaid'});

//     res.json({
//         message: "list of all users",
//         data: allUsers,
//     });
//     // res.send(users);
// }

export async function getUser(req, res) {
    let id = req.id;
    let user = await userModel.findById(id);
    if (user) {
        return res.json({ user });
    } else {
        return res.json({
            message: "user not found",
        });
    }
}

// export function postUser(req, res) {
//     console.log("req.body", req.body);
//     console.log("here");
//     let dataToBeUpdated = req.body;
//     for (key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key];
//     }
//     res.json({
//         message: "updated successfully",
//     });
// }

// export async function updateUser(req, res) {
//     // console.log("req.body", req.body);
//     // console.log("here");
//     let dataToBeUpdated = req.body;
//     let user = await userModel.findOneAndUpdate(
//         { email: "zaid25akhter@gmail.com" },
//         dataToBeUpdated
//     );
//     // for (key in dataToBeUpdated) {
//     //     users[key] = dataToBeUpdated[key];
//     // }
//     res.json({
//         message: "updated successfully",
//         user,
//     });
// }

export async function updateUser(req, res) {
    let id = req.params.id;
    // console.log("id is: ", id);
    try {
        let user = await userModel.findById(id);
        console.log("user is", user);
        // console.log("userrrr");
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            if (keys.includes("password")) {
                user.passwordModified = true;
            }
            // console.log("keys", keys);
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            // user["_id"] = new mongodb.ObjectId(
            //     Math.floor(Math.random() * 1000)
            // );
            // console.log("deletedData", deletedData);
            // console.log"user is: ", user);
            await user.save();
            return res.json({
                message: "updated",
                user: user,
            });
        } else {
            return res.json({
                message: "user not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

// export async function deleteUser(req, res) {
//     // users = {};
//     let user = await userModel.findOneAndDelete({
//         email: "zaid25akhter@gmail.com",
//     });

//     res.json({
//         message: "data deleted successfully",
//         user,
//     });
// }

export async function deleteUser(req, res) {
    let id = req.params.id;
    try {
        let user = await userModel.findOneAndDelete({ _id: id });
        if (!user) {
            return res.json({
                message: "user not found",
            });
        } else {
            return res.json({
                message: "user deleted",
                data: user,
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

// export function getUserById(req, res) {
//     console.log("params is", req.params);
//     res.send(req.params.id);
// }

export async function getAllUsers(req, res) {
    let users = await userModel.find();
    if (users) {
        return res.json({
            message: "users are: ",
            data: users,
        });
    }
}

export function setCookies(req, res) {
    // res.setHeader("Set-Cookie", "isLoggedIn=true");
    //httpOnly -> can't be accessed from frontend
    res.cookie("isLoggedIn", false);
    res.send("cookies has been set");
}

export function getCookies(req, res) {
    let cookie = req.cookies;
    console.log(cookie);
    res.send("cookies recieved");
}

export async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        res.json({
            message: "user signed up",
            data: user,
        });
    } catch (err) {
        res.json({
            message: "error",
            data: err,
        });
    }
}

export async function login(req, res) {
    let { email, password } = req.body;
    // console.log(email);
    // console.log(password);
    try {
        if (email) {
            let user = await userModel.findOne({ email: email });
            console.log("user is: ", user);
            if (user) {
                //bcrypt
                const result = await bcrypt.compare(password, user.password);
                console.log(password, user.password);
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
            message: err.message,
        });
    }
}

//isAuthorised
export function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            return res.status(401).json({
                message: "operation not allowed",
            });
        }
    };
}

//protect route
export async function protectRoute(req, res, next) {
    console.log("entered");
    // console.log(req.cookies.login);
    try {
        if (req.cookies.login) {
            let payload = jwt.verify(req.cookies.login, JWT_KEY);
            console.log(payload);
            const user = await userModel.findById(payload.payload);
            if (user) {
                req.role = user.role;
                req.id = user.id;
                if (payload.payload) {
                    next();
                } else {
                    return res.json({
                        message: "user not verified",
                    });
                }
            } else {
                return res.json({
                    message: "user not found",
                });
            }
        } else {
            const client = req.get("User-Agent");
            if (client.includes("Mozilla/5.0")) {
                console.log("browser request");
            }
            return res.json({
                message: "user not logged in",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

//forget password
export async function forgetPassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get(
                "host"
            )}/resetPassword/${resetToken}`;
            //send email to user
            //node mailer
        } else {
            return res.json({
                message: "user not signed up",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

//reset password
export async function resetPassword(req, res) {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    user.resetPasswordHandler(password, confirmPassword);
    await user.save();
    res.json({
        message: "password changed successfully",
    });
}

export function logout(req, res) {
    res.cookie("login", "", { maxAge: 1 });
    res.json({
        message: "user logged out",
    });
}
