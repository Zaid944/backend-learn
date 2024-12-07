import mongoose from "mongoose";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

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
        minLength: 8,
        validate: function () {
            return this.confirmPassword === this.password;
        },
    },
    role: {
        type: String,
        enum: ["admin", "user", "restaurantOwner", "deliveryBoy"],
        default: "user",
    },
    profileImage: {
        type: String,
        default: "img/users/default.jpeg",
    },
    resetToken: String,
});

userSchema.pre("save", function () {
    // console.log("removing confirmPasword");
    this.confirmPassword = undefined;
});

userSchema.pre("save", function (next) {
    console.log("yayyyyy", this._doc.password);
    next();
});

userSchema.pre("save", async function (next) {
    // if(this.get("modifiedPassword")) {

    // }
    let salt = await bcrypt.genSalt();
    console.log(this.password);
    let hashedString = await bcrypt.hash(this.password, salt);
    console.log("hashedString is: ", hashedString);
    this.password = hashedString;
    next();
});

userSchema.methods.createResetToken = function () {
    //creating using token using crypto
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
};

//model
const userModel = mongoose.model("userModel", userSchema);

export default userModel;
// async function createUser() {
//     let user = {
//         name: "Zaid",
//         email: "def@gmail.com",
//         password: "123",
//         confirmPassword: "123",
//     };

//     let data = await userModel.create(user);
//     console.log(data);
// }
