import planModel from "../models/planModel.js";
import reviewModel from "../models/reviewModel.js";

export async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            return res.json({
                message: "reviews",
                data: reviews,
            });
        } else {
            return res.json({
                message: "reviews not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

export async function top3Reviews(req, res) {
    try {
        const reviews = await reviewModel
            .find()
            .sort({
                rating: -1,
            })
            .limit(3);
        if (reviews) {
            return res.json({
                message: "reviews",
                data: reviews,
            });
        } else {
            return res.json({
                message: "reviews not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

export async function getPlanReviews(req, res) {
    let planid = req.params.id;
    try {
        const reviews = await reviewModel.find();
        reviews = reviews.filter((review) => review.plan._id == planid);
        if (reviews) {
            return res.json({
                message: "reviews",
                data: reviews,
            });
        } else {
            return res.json({
                message: "reviews not found",
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

// http://localhost:300/plan?plan=123&name=Zaid
// http -> network protocol
// localhost -> base url
// plan, name -> params

export async function createReview(req, res) {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    // plan.ratingsAverage -> iski calculation
    await plan.save();
    return res.json({
        message: "review created",
        data: review,
    });
}

//req ki body mei review ki id bheji hai
export async function updateReview(req, res) {
    let planid = req.params.id;
    let id = req.body.id;
    let review = reviewModel.findById(id);
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let k in dataToBeUpdated) {
        keys.push(k);
    }
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == "_id") continue;
        review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    return res.json({
        message: "review updated",
        data: review,
    });
}

export async function deleteReview(req, res) {
    let planid = req.params.id;
    let id = req.body.id;
    let review = reviewModel.findByIdAndDelete(id);
    return res.json({
        message: "review deleted",
        data: review,
    });
}
