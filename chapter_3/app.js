import express from "express";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import planRouter from "./routers/planRouter.js";
//middleware -> frontend -> json convert
//json -> javascript objects
//global middleware
app.use(express.json());
app.use(cookieParser());
// let users = {};

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/plan", planRouter);

//res is not a blocking function
//so after this also code executes

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
