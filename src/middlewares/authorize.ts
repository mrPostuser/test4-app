import { Request, Response, NextFunction } from 'express';

// Middleware to check the user's role
export function authorize(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user; // User data obtained from JWT

    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ error: 'Access denied. Insufficient privileges.' });
    }

    next();
  };
}
