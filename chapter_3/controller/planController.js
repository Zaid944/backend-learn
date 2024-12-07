import planModel from "../models/planModel.js";
export async function getAllPlans(req, res) {
    let plans = await planModel.find();
    try {
        if (plans) {
            return res.json({
                message: "all plans retrieved",
                data: plans,
            });
        } else {
            return res.json({
                message: "plans not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export async function getPlan(req, res) {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    try {
        if (plan) {
            return res.json({
                message: "plan retrieved",
                data: plan,
            });
        } else {
            return res.json({
                message: "plan not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export async function createPlan(req, res) {
    try {
        let planData = req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message: "plan created",
            data: createdPlan,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

export async function deletePlan(req, res) {
    let id = req.params.id;
    let plan = await planModel.findByIdAndDelete(id);
    try {
        if (plan) {
            return res.json({
                message: "plan deleted",
                data: plan,
            });
        } else {
            return res.json({
                message: "plan not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

export async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        // console.log(keys);
        // console.log("before loop", plan);
        for (let i = 0; i < keys.length; i++) {
            // console.log("key is: ", key);
            // console.log(plan[key], dataToBeUpdated[key]);
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        // console.log(plan);
        await plan.save();
        return res.json({
            message: "updated",
            data: plan,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}

export async function top3Plans(req, res) {
    try {
        const plans = await planModel
            .find()
            .sort({ ratingsAverage: -1 })
            .limit(3);
        return res.json({
            message: "top 3 plans are: ",
            data: plans,
        });
    } catch (err) {
        return res.json({
            message: err.message,
        });
    }
}
