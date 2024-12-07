import jwt from "jsonwebtoken";
import JWT_KEY from "../secrets.js";

function protectRoute(req, res, next) {
    if (req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
        if (isVerified) {
            next();
        } else {
            return res.json({
                message: "user not verified",
            });
        }
    } else {
        return res.json({
            message: "user not logged in",
        });
    }
}

export default protectRoute;
