import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey';

export function generateToken(userId: number, role: string) {
  return jwt.sign({ userId, role }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY);
}