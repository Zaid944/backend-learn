import mongoose from "mongoose";
import emailValidator from "email-validator";
import bcrypt from "bcrypt";
import crypto from "crypto";

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20, "plan name should not exceed 20 chars"],
    },
    duration: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "price not entered"],
    },
    ratingsAverage: {
        type: Number,
    },
    discount: {
        type: Number,
        validate: function () {
            return this.discount < 100;
        },
    },
});

const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//     let plan = {
//         name: "SuperFood",
//         duration: 30,
//         price: 1000,
//         ratingsAverage: 4,
//         discount: 20,
//     };

//     const doc = new planModel(plan);
//     console.log(doc);
//     await doc.save();
// })()

export default planModel;
