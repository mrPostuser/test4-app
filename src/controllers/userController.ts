import { Request, Response } from 'express';
import { createUser, getAllUsers, findUserByEmail, updateUserProfile, updateUserRole, deleteUser, removeUserRole } from '../services/userService';
import { loginUser } from '../services/authService';
import { hashPassword } from '../utils/password';

// Register a new user
export async function registerUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, hashedPassword);
    return res.status(201).json({ message: 'User created', user });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user' });
  }
}

// User login
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser(email, password);
    return res.json({ token, user });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error logging in';
    return res.status(400).json({ error: errorMessage });
  }
}

// Getting all users (for administrators)
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching users' });
  }
}

// Updating a User Profile
export async function updateProfile(req: Request, res: Response) {
  const userId = (req as any).user.userId;  // userId must be obtained from JWT token (middleware)
  const { email } = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, email);
    return res.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating profile' });
  }
}

// Updating a User Role (Administrators Only)
export async function updateRole(req: Request, res: Response) {
  // const adminUserId = (req as any).user.userId; //ID of the current authorized user (administrator)
  const { userId, role } = req.body; // Getting the user ID and new role from the request body

  try {
    //Only the administrator can change roles
    if ((req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Only admins can update roles.' });
    }

    // Updating the user role
    const updatedUser = await updateUserRole(userId, role);
    return res.json({ message: 'Role updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating role' });
  }
}

// Delete a user (administrators only)
export async function deleteUserById(req: Request, res: Response) {
  const { userId } = req.params;  // User ID from URL parameters

  try {
    // Only administrators can delete users
    if ((req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Only admins can delete users.' });
    }

    await deleteUser(Number(userId));
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting user' });
  }
}

// Delete a user role (administrators only)
export async function deleteUserRole(req: Request, res: Response) {
  const { userId } = req.params;  // User ID from URL parameters

  try {
    // Only administrators can delete roles
    if ((req as any).user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Only admins can remove roles.' });
    }

    const updatedUser = await removeUserRole(Number(userId));
    return res.json({ message: 'Role removed successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: 'Error removing role' });
  }
}
