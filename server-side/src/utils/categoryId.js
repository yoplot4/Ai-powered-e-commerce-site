import dbConnect from "../../config/dbConnect.js";

const getCategoryId = async (name) => {
  try {
    const sql = `select id, name from categories where name = ?`;
    const [ rows ] = await dbConnect.execute(sql, [name])
    if(rows.length === 0){
      return 'The category does not exist'
    }
    return rows[0].id;
  } catch (error) {
    throw error;
  }
}

export { getCategoryId };