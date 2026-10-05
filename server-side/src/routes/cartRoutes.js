// cart routes
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { addToCart } from '../controllers/cartController.js';

const cartRout = express.Router();

// All cart routes require JWT authentication
cartRout.get('/v1/cart',/* verifyToken,*/ (req,res) => {
  res.send('All cartitems are accessed successfully');
});
cartRout.post('/v1/cart/items',/* verifyToken,*/ addToCart);
cartRout.patch('/v1/cart/items/:itemId',/* verifyToken,*/ (req,res) =>{
  res.send('the product is updated succesfully');
});
cartRout.delete('/v1/cart/items/:itemId',/* verifyToken,*/ (req, res) => {
  res.send('Product on the cart are remove');
});
cartRout.delete('/v1/cart', /*verifyToken,*/ (req, res) => {
  res.send('All cartItems are remove from the cart')
});

export { cartRout };