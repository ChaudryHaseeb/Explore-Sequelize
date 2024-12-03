const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || 
        req.query.token || 
        req.headers["x-access-token"] || 
        req.headers.authorization || 
        req.headers.Authorization;

    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }

    let extractedToken = token;

    if (token.startsWith("Bearer ")) {
        extractedToken = token.split(" ")[1];
    }

    try {
        req.user = jwt.verify(extractedToken, process.env.TOKEN_KEY);
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }

    return next();
};

module.exports = verifyToken;
