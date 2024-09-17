import { Router } from 'express';
import { registerUser, getUsers, login, updateProfile, updateRole, deleteUserById, deleteUserRole  } from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/authorize';

const router = Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', login);

// Getting all users (administrators only)
router.get('/users', authenticate, authorize('admin'), getUsers);

// Profile update (for authorized users)
router.put('/profile', authenticate, updateProfile);

// Updating a User Role (Administrators Only)
router.put('/role', authenticate, authorize('admin'), updateRole);

// Delete a user (administrators only)
router.delete('/users/:userId', authenticate, authorize('admin'), deleteUserById);

// Delete a user role (administrators only)
router.put('/users/:userId/remove-role', authenticate, authorize('admin'), deleteUserRole);


export default router;
