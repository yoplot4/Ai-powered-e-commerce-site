// address routes
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

const addressRoute = express.Router();

// All address routes require JWT authentication (user-specific)
addressRoute.get('/v1/addresses', verifyToken, (req, res) => {
  res.send('to get all users addresses')
});
addressRoute.post('/v1/addresses', verifyToken, (req, res) => {
  res.send('New address is add succesfully');
});
addressRoute.patch('/v1/addresses/:id', verifyToken, (req, res) => {
  res.send('user adress is updated');
});
addressRoute.delete('/v1/addresses/:id', verifyToken, (req, res) => {
  res.send('user address is deleted succesfully')
});

export { addressRoute };