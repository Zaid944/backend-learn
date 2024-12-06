const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const emailValidator = require("email-validator");
const app = express();
//middleware -> frontend -> json convert
//json -> javascript objects
//global middleware
app.use(express.json());
// let users = {};

const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter
    .route("/")
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter.route("/:id").get(getUserById);

authRouter
    .route("/signup")
    .get(middleware1, getSignup, middleware2)
    .post(postSignup);

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

//res is not a blocking function
//so after this also code executes
function getSignup(req, res, next) {
    res.sendFile("/views/index.html", { root: __dirname });
    next();
}

async function postSignup(req, res) {
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

function middleware1(req, res, next) {
    console.log("middleware1 called");
    next();
}

function middleware2(req, res) {
    console.log("middleware2 called");
}

app.listen(3000);

//app.use -> global middleware
//app.get -> specific path ka middleware

const db_link =
    "mongodb+srv://Zaid10Akhter:UutSaEHHx4oZzOKm@cluster0.yi2qy.mongodb.net/";

mongoose
    .connect(db_link)
    .then((db) => {
        // console.log(db);
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function () {
                return emailValidator.validate(this.email);
            },
            "email format is wrong",
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword === this.password;
        },
    },
});

userSchema.pre("save", () => {
    console.log("removing confirmPasword");
    this.confirmPassword = undefined;
});

//model
const userModel = mongoose.model("userModel", userSchema);

async function createUser() {
    let user = {
        name: "Zaid",
        email: "def@gmail.com",
        password: "123",
        confirmPassword: "123",
    };

    let data = await userModel.create(user);
    console.log(data);
}
