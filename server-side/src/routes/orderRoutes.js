// order routes
import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { addOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

// All order routes require JWT authentication

// Create new order
orderRoute.post('/v1/orders/checkout',/* verifyToken,*/ addOrder);

// Get user's order history
orderRoute.get('/v1/orders', /* verifyToken,*/ (req, res) => {
  res.send('to see order history');
});

// Get specific order
orderRoute.get('/v1/orders/:id',/* verifyToken,*/ (req, res) => {
  res.send('to see specific order history');
});

// Get all users' orders (admin only)
orderRoute.get('/v1/orders/admin/all', /* verifyToken, authorizeRoles('admin'),*/ (req, res) => {
  res.send('to see all users order');
});

// Update order status (admin only)
orderRoute.patch('/v1/orders/:id/status', /* verifyToken, authorizeRoles('admin'),*/ (req, res) => {
  res.send('to change order status');
});

export { orderRoute };