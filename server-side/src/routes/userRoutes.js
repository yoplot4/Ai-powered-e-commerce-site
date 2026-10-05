import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';

const UserRouter = express.Router();

// All user routes require JWT authentication

// Get own user profile (authenticated users)
UserRouter.get('/v1/user/profile', verifyToken, (req, res) => {
  res.send('the user profile is see correctly')
});

// Update own user profile (authenticated users)
UserRouter.patch('/v1/user/profile/:id', verifyToken, (req, res) => {
  res.send('User profile update endpoint');
});

// Get all users (admin only)
UserRouter.get('/v1/users', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.send('Get all users endpoint');
});

// Get specific user (admin or self)
UserRouter.get('/v1/user/:id', verifyToken, (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
});

// Delete specific user (admin only)
UserRouter.delete('/v1/user/:id', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.send(`Delete user with ID: ${req.params.id}`);
});

// Update specific user (admin only)
UserRouter.patch('/v1/user/:id', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.send(`Update user with ID: ${req.params.id}`);
});

export { UserRouter };