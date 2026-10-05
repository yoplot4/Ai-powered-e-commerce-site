import dbConnect from "../../config/dbConnect.js";

const createCategoryModel = async (name, description) => {
	try {
		const insertCategory = `INSERT INTO categories (name, description) values (?, ?)`;
		const insertValues = [name, description];
		const [categoryResult] = await dbConnect.execute(
			insertCategory,
			insertValues,
		);
		return { success: true, categoryId: categoryResult.insertId };
	} catch (error) {
		console.log(error);
	}
};
const checkExistCategory = async (name) => {
	try {
		const checkSql = `SELECT id, name, description from categories where name=?`;
		const [checkResult] = await dbConnect.execute(checkSql, [name]);
		return checkResult[0];
	} catch (error) {}
};

const viewExistingCategories = async () => {
	try {
		const viewCategorySql = `SELECT id, name, description from categories`;
		const [allCategory] = await dbConnect.execute(viewCategorySql);
		return allCategory;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
const viewSingleExistCategory = async ( id ) => {
	try {
		const SingleCate = `SELECT id, name, description from categories where id = ?`;
		const [ singlecate] = await dbConnect . execute(SingleCate, [ id ]);
		return singlecate;
	} catch (error) {
		console.log(error);
		throw error
	}
}

// cretate function to update single product by use single
const updateSingleCategory = async (categoryId, updateFields) => {
  const fields = [];
  const values = [];

  // Collect valid fields
  Object.keys(updateFields).forEach((key) => {
    if (updateFields[key] !== undefined && updateFields[key] !== null) {
      fields.push(`${key} = ?`);
      values.push(updateFields[key]);
    }
  });

  // Validate
  if (fields.length === 0) {
    throw new Error("No valid fields provided for update.");
  }

  // Add categoryId for WHERE clause
  values.push(categoryId);

  // Build SQL
  const sql = `
    UPDATE categories
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  try {
    const [result] = await dbConnect.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
  try {
    // ✅ categories ሰንጠረዥ ላይ UPDATE ማድረግ
    const sql = `UPDATE categories SET is_deleted = 1 WHERE id = ? AND is_deleted = 0`;
    const [result] = await dbConnect.execute(sql, [categoryId]);
    return result;
  } catch (error) {
    console.error("Error soft deleting category:", error);
    throw error;
  }
};

export {
	createCategoryModel,
	checkExistCategory,
	viewExistingCategories,
	viewSingleExistCategory, 
	updateSingleCategory,
  deleteCategory };
