const express = require("express");
const app = express();
//middleware -> frontend -> json convert
app.use(express.json());
let users = {};

const userRouter = express.Router();

app.use("/user", userRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

// app.get("/users", (req, res) => {
//     console.log(req.query);
//     res.send(users);
// });

// app.post("/users", (req, res) => {
//     console.log("params is: ", req.params);
//     console.log(req.body);
//     console.log("inside this function");
//     users = req.body;
//     res.send({
//         message: "data recieved succesfully",
//         user: req.body,
//     });
// });

// //update
// app.patch("/users", (req, res) => {
//     console.log("req.body", req.body);
//     console.log("here");
//     let dataToBeUpdated = req.body;
//     for (key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key];
//     }
//     res.json({
//         message: "updated successfully",
//     });
// });

// app.delete("/users", (req, res) => {
//     users = {};
//     res.json({
//         message: "data deleted successfully",
//     });
// });

// app.get("/users/:id", (req, res) => {
//     console.log("params is", req.params);
//     res.send(req.params.id);
// });

function getUser(req, res) {
    console.log(req.query);
    res.send(users);
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

function updateUser(req, res) {
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

function deleteUser(req, res) {
    users = {};
    res.json({
        message: "data deleted successfully",
    });
}

function getUserById(req, res) {
    console.log("params is", req.params);
    res.send(req.params.id);
}

app.listen(3000);
