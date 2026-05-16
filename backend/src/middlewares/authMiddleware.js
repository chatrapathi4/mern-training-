import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
      return res.status(401).json({ message: "JWT Token is missing" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ message: "JWT secret not configured" });
  }

  try {
      const verify = jwt.verify(token, secret);
      req.user = verify;
      next();
  } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid or expired token" });
  }
}


