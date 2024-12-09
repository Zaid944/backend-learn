// This is your test secret API key.
import Stripe from "stripe";
const stripe = new Stripe(
    "sk_test_51MMbflSBfCjI8wogIwWu2LMg8eBnvJDeIkwztzrP0WFQe5XljCl0J8JadVrspfsRvVule0o56z3JNVPkNbg8u46y00QSKLVbjj"
);
import planModel from "../models/planModel";
import userModel from "../models/userModel";

export async function createSession(req, res) {
    try {
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: user.email,
            client_reference_id: plan.id,
            line_items: [
                {
                    name: plan.name,
                    description: plan.description,
                    amount: plan.price * 100,
                    currency: "inr",
                    quantity: 1,
                },
            ],
            success_url: "",
            cancel_url: "",
            mode: "payment",
        });
        return res.status(200).json({
            status: "success",
            session,
        });
    } catch (err) {
        return res.json({
            err: err.message,
        });
    }
}

app.listen(4242, () => console.log("Running on port 4242"));
