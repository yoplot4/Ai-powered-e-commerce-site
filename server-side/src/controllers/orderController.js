import { getUserInfo } from '../utils/userInfoForOrder.js';
import { createOrderModel } from '../models/order.model.js';

const addOrder = async (req, res) => {
  // 1. shipping address use let if not exist to assign another value
  const {  total_amount, status } = req.body;
  const userId= req.body;
  let { shipping_address_id } = req.body;

  // 2. check the order information exist
  if (!userId || !total_amount || !status) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required order information"
    });
  }
  
  try {
    // 3. if not shipping address send by frontend
    if (!shipping_address_id) {
      shipping_address_id = await getUserInfo(userId);
    }

    // it does not exist shipping addres it does not deliver
    if (!shipping_address_id) {
      return res.status(400).json({
        success: false,
        message: "No shipping address found. Please add an address first.",
      });
    }

    const orderResult = await createOrderModel({ 
      userId, 
      total_amount, 
      status, 
      shipping_address_id 
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: orderResult.orderId,
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

export { addOrder };