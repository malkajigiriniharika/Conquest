const jwt = require("jsonwebtoken");

const authMiddleware = (req) => {
  try {
    // console.log("Request Headers:");
    let Authtoken = "";
    Object.entries(req.rawHeaders).forEach(([key, value]) => {
      if (value.startsWith("Bearer ")) {
        Authtoken = value.split(" ")[1];
      }
    });

    if (Authtoken == "") {
      console.warn("Authentication failed: No valid token provided");
      return null;
    }

    return jwt.verify(Authtoken, process.env.JWT_SECRET); // Return decoded token directly
  } catch (err) {
    console.error("Authentication failed:", err.message);
    return null;
  }
};

module.exports = authMiddleware;
