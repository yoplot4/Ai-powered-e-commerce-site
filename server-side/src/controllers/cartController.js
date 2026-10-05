import { addToCartModel } from "../models/cart.model.js";
const addToCart = async (req,res) => {

  const cartItem = req.body;
  if(!cartItem.user_id){
    return res.status(404).json({
      success:false,
      message:"You are not authorized"
    });
  }
  if(!cartItem.product_id || !cartItem.quantity){
    return res.status(401).json({
      success: false,
      message:"you are not add to cart"
    });
  }
  try{
  const addResult = await addToCartModel(cartItem);
  

  return res.status(201).json({
    success:true,
    message:"you are succesfully add to cart",
    result: addResult
  });
}catch(error){
  
  return res.status(500).json({
  success:false,
  message: "you are not succesfuly add the product",
  error: error
  })
}
}

export { addToCart }