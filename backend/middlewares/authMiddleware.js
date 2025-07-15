import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("Not authorized, no token");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).send("Not authorized, token not valid");
  }
};

export { protect };
