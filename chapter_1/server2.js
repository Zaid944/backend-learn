const express = require("express");
const app = express();
//middleware -> frontend -> json convert
app.use(express.json());
let users = {};

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", (req, res) => {
    console.log(req.body);
    console.log("inside this function");
    users = req.body;
    res.send({
        message: "data recieved succesfully",
        user: req.body,
    });
});

//update
app.patch("/users", (req, res) => {
    console.log("req.body", req.body);
    console.log("here");
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "updated successfully",
    });
});

app.delete("/users", (req, res) => {
    users = {};
    res.json({
        message: "data deleted successfully",
    });
});

app.listen(3000);
