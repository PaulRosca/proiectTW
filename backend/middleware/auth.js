import jwt from "jsonwebtoken";
import config from "config";

export const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (!decoded) {
      return res.status(400).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(400).json({ message: "Token is not valid" });
  }
};

export const extractUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (!decoded) {
      return next();
    }
    req.user = decoded;
    return next();
  } catch (err) {
    return next();
  }
};
