// ai routes
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

const aiRoute = express.Router();

// Chat route (requires JWT - user-specific chat history)
aiRoute.post('/v1/ai/chat', verifyToken, (req, res)=>{
  res.send('you are correctly asked me please wait the response');
})

// Get chat history (requires JWT - user-specific)
aiRoute.get('/v1/ai/chat/history', verifyToken, (req, res)=>{
  res.send('You are get yours chat history');
})

// AI recommendations (can be public or JWT based on your business logic)
// Using verifyToken here since it's typically personalized
aiRoute.get('/v1/ai/recommendations', verifyToken, (req, res)=>{
  res.send('I recommend this product for you')
});

// Log activity (requires JWT - user-specific)
aiRoute.post('/v1/ai/log-activity', verifyToken, (req, res)=>{
  res.send('I tracked you activity')
})

export { aiRoute };