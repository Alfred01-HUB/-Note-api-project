const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1. Check if token exists
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // 2. Split "Bearer token"
  const [bearer, token] = authHeader.split(" ");

  // 3. Validate format
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization format" });
  }

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, process.env.SERVER_SECRET || "default_secret");

    // 5. Attach user info to request object
    req.user = decoded; // This makes user data available in next middleware or routes

    // 6. Continue
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticate;
