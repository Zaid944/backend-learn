function protectRoute(req, res, next) {
    if (req.cookies.isLoggedIn) {
        next();
    } else {
        return res.json({
            message: "user not logged in",
        });
    }
}

export default protectRoute