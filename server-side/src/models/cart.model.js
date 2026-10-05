import dbConnect from "../../config/dbConnect.js";

const addToCartModel = async (cartItem)=>{
  const cartDetails ={
    user_id: cartItem.user_id,
    status: cartItem.status || null,
    product_id: cartItem.product_id,
    quantity:cartItem.quantity
  }
  const conn= await dbConnect.getConnection();
  try {
    await conn.beginTransaction();
    const cartSql = `INSERT INTO carts(user_id, status) values (?,?)`;
    const cartValues=[cartDetails.user_id, cartDetails.status];
    const [cartResult] = await conn.execute(cartSql, cartValues);

    const cart_id= cartResult.insertId;

    const cartItemsSql = ` INSERT INTO cart_items(cart_id,product_id,quantity) values(?,?,?)`;
    const cartItemValues =[cart_id, cartDetails.product_id, cartDetails.quantity];
    const [cartItemResult] = await conn.execute(cartItemsSql, cartItemValues);
    await conn.commit();
    return {
        cartResult, cartItemResult
    }
  } catch (error) {
    await connection.rollback();
    console.log(error);
  }finally{
    if(connection){
    connection.release()
    }
  }
}

export { addToCartModel };