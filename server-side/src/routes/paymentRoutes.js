// payment routes
import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";

const paymentRoute = express.Router()

// All payment routes require JWT authentication (user-specific)
paymentRoute.post('/v1/payments/process', verifyToken, (req, res)=>{
  res.send('this payment route to third party payment systems');
});

// Webhook can be public (payment gateway will call it)
paymentRoute.post('/v1/payments/webhook', (req, res)=>{
  res.send('this is to see payments');
});

// Get payment info for order (requires JWT)
paymentRoute.get('/v1/payments/order/:orderId', verifyToken, (req, res)=>{
  res.send('this route gets all payments');
});

export { paymentRoute }
