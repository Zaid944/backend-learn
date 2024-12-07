import express from "express";
import { isAuthorised, protectRoute } from "../controller/userController.js";
import {
    getAllPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
} from "../controller/planController.js";
const planRouter = express.Router();

planRouter.route("/allPlans").get(getAllPlans);

planRouter.use(protectRoute);
planRouter.route("/getPlan/:id").get(getPlan);

planRouter.use(isAuthorised(["admin", "restaurantowner"]));
planRouter.route("/crudPlan").post(createPlan);

planRouter.route("/crudPlan/:id").patch(updatePlan).delete(deletePlan);

export default planRouter;
