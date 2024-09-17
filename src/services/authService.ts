import { findUserByEmail } from './userService';
import { comparePasswords } from '../utils/password';
import { generateToken } from '../utils/jwt';

// User login
export async function loginUser(email: string, password: string) {
  // Search for a user by email
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  // Comparing a password with a hashed password in the database
  const passwordMatch = await comparePasswords(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  // Generating JWT for an authorized user
  const token = generateToken(user.id, user.role);
  return { token, user };
}
