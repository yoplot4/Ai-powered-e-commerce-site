// review routes
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

const reviwRoutes = express.Router();

// Get reviews (public - anyone can view)
reviwRoutes.get('/v1/products/:productId/reviews', (req, res)=>{
  res.send('the comments are succesfuly get');
});

// Post review (requires JWT - only logged-in users can review)
reviwRoutes.post('/v1/reviews', verifyToken, (req, res)=>{
  res.send('the comments are succesfuly submited');
});

// export the review route

export { reviwRoutes };

