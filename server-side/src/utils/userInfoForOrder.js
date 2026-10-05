import dbConnect from "../../config/dbConnect.js";

const getUserInfo = async (userId)=>{
  if(!userId) {
    return null;
  }
  try {
    const sql = `select id from addresses where user_id = ? ORDER BY is_default DESC, created_at DESC 
    LIMIT 1`
    const [rows]= await dbConnect.execute(sql, [userId]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0].id;
  } catch (error) {
    throw error
  }
}

export { getUserInfo };