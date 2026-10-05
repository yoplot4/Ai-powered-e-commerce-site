import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

const wishlistRoute = express.Router();

// All wishlist routes require JWT authentication (user-specific)
wishlistRoute.get('/v1/wishlist', verifyToken, (req, res)=>{
  res.send('all the wish are get')
})
wishlistRoute.post('/v1/wishlist', verifyToken, (req, res)=>{
  res.send('the wishs are created ')
})
wishlistRoute.delete('/v1/wishlist/:productId', verifyToken, (req, res)=>{
  res.send('the wishs are succesfuly deleted')
})

// export wishlist route to in other

export { wishlistRoute };
