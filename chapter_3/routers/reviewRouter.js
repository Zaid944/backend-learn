import express from "express";
import { protectRoute } from "../controller/userController.js";
import {
    getAllReviews,
    top3Reviews,
    getPlanReviews,
    createReview,
    updateReview,
    deleteReview,
} from "../controller/reviewController.js";
const reviewRouter = express.Router();

reviewRouter.route("/allReviews").get(getAllReviews);

reviewRouter.route("/top3Reviews").get(top3Reviews);

reviewRouter.route("/:id").get(getPlanReviews);

reviewRouter.use(protectRoute);

reviewRouter
    .route("/crud/:plan")
    .post(createReview)
    .patch(updateReview)
    .delete(deleteReview);

export default reviewRouter;
