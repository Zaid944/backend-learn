import express from "express";
import { protectRoute } from "../controller/userController";
import { createSession } from "../controller/bookingController";

const bookingRouter = express.Router();

bookingRouter.post("/createSession", protectRoute, createSession);
