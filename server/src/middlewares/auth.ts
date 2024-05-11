import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface User {
  username: string;
  role: string;
  // Add other properties as needed
}

// Extend Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const secretKey: Secret = process.env.JWT_SECRET!;

async function authenticateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const user = jwt.verify(token, secretKey) as User;

      req.user = user;
      next();
    } else {
      res.status(401).json({ message: 'Session expired. Please login again.' });
    }
  } catch (error) {
    res.status(403).json({ message: 'Authentication failed' });
  }
}

export { secretKey, authenticateJWT };
