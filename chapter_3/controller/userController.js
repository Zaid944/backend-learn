import userModel from "../models/userModel.js";

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
    let id = req.params.id;
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
    try {
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if (user) {
            const keys = [];
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            await userModel.deleteOne({ _id: id });
            return res.json({
                message: "updated",
                user: updatedData,
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
