import dbConnect from "../../config/dbConnect.js";
import { v4 as uuid4 } from 'uuid';
const createProduct = async (product) => {
  const { name, price, stock_quantity
    , sku, brand, short_description, 
    long_description, specifications, ai_tags, category_id, image_url
  } = product;

  const id = uuid4();
  // begin transaction
  const connection = await dbConnect.getConnection();
  await connection.beginTransaction();
  try {
    // product sql
    const productSql = `INSERT INTO products (id, category_id, name, price, stock_quantity, sku, brand) values (?, ?,?,?,?,?,?)`;
    const productValue = [id, category_id, name, price, stock_quantity, sku, brand];
    const [ productResult ] = await connection.execute(productSql, productValue);

    //const productid = productResult.insertId;

    // description sql
    const descriptionSql = `INSERT INTO product_descriptions (product_id, short_description, long_description, specifications, ai_tags) values (?,?,?,?,?) `;
    const descriptionValue = [ id, short_description, long_description, specifications, ai_tags ];
    const [descriptionResult] = await connection.execute( descriptionSql, descriptionValue );

    const imageSql = `INSERT INTO product_images (product_id, image_url, is_primary) values (?,?,?)`;
    const imageValue = [id, image_url, true];
    const [imageResult] = await connection.execute(imageSql, imageValue);

    await connection.commit();

    return { productResult, descriptionResult, imageResult }
  } catch (error) {
    await connection.rollback();
    console.log(error);
    throw error;
  }finally{
    if(connection){
    connection.release()
    }
  }
};

const getAllProduct = async ()=>{
  try {
    const sql = `
    SELECT 
      p.id,
      p.name,
      p.price,
      p.stock_quantity,
      p.sku,
      p.brand,
      c.name AS category_name,
      pd.short_description,
      pd.long_description,
      pd.specifications,
      pd.ai_tags,
      pi.image_url
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_descriptions pd ON p.id = pd.product_id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
    ORDER BY p.created_at DESC;
  `;
  const [products] = await dbConnect.execute(sql);
  return products;
  } catch (error) {
    throw error
  }
  
}
const searchProductModel = async (keyword) => {
  try {
    const searchTerm = keyword ? `%${keyword}%` : "%%";

    const sql = `
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.stock_quantity, 
        p.sku, 
        p.brand,
        c.name AS category_name,
        pd.short_description, 
        pd.long_description, 
        pd.specifications, 
        pd.ai_tags,
        pi.image_url
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_descriptions pd ON p.id = pd.product_id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
      WHERE 
        p.name LIKE ? OR 
        p.brand LIKE ? OR 
        c.name LIKE ? OR 
        pd.short_description LIKE ? OR
        pd.ai_tags LIKE ?
      ORDER BY p.created_at DESC;
    `;

    const [products] = await dbConnect.execute(sql, [
      searchTerm, 
      searchTerm, 
      searchTerm, 
      searchTerm, 
      searchTerm
    ]);

    return products;
  } catch (error) {
    throw error;
  }
};
const getProductByIdModel = async (productId) => {
  const sql = `
    SELECT 
      p.id,
      p.name,
      p.price,
      p.stock_quantity,
      p.sku,
      p.brand,
      c.name AS category_name,
      pd.short_description,
      pd.long_description,
      pd.specifications,
      pd.ai_tags,
      pi.image_url
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_descriptions pd ON p.id = pd.product_id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = 1
    WHERE p.id = ?;
  `;

  const [rows] = await dbConnect.execute(sql, [productId]);

  // ምርቱ ካልተገኘ null ይመልሳል
  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};
const addProductImagesModel = async (productId, imageUrls) => {
  const connection = await dbConnect.getConnection();

  try {
    await connection.beginTransaction();

    // 1. የምርቱ ID በዳታቤዝ ውስጥ መኖሩን ማረጋገጥ
    const [productCheck] = await connection.execute(
      `SELECT id FROM products WHERE id = ?`,
      [productId]
    );

    if (productCheck.length === 0) {
      await connection.rollback();
      return { status: 404, message: "Product not found" };
    }

    // 2. የብዙ ምስሎችን URL በነጠላ Query ማዘጋጀት (Batch Insert)
    const sql = `INSERT INTO product_images (product_id, image_url, is_primary) VALUES ?`;
    
    // [[productId, url1, 0], [productId, url2, 0], ...]
    const values = imageUrls.map((url) => [productId, url, 0]);

    await connection.query(sql, [values]);

    await connection.commit();
    return { status: 201, count: imageUrls.length };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const updateProductModel = async (productId, updateData) => {
  const connection = await dbConnect.getConnection();

  try {
    await connection.beginTransaction();

    // 1. የምርቱን መኖር ማረጋገጥ
    const [existing] = await connection.execute(
      `SELECT id FROM products WHERE id = ?`,
      [productId]
    );

    if (existing.length === 0) {
      await connection.rollback();
      return { status: 404, message: "Product not found" };
    }

    // 2. የ Products Table Fields መለየት
    const productFields = [];
    const productValues = [];

    const allowedProductKeys = ["name", "price", "stock_quantity", "sku", "brand", "category_id"];
    
    allowedProductKeys.forEach((key) => {
      if (updateData[key] !== undefined) {
        productFields.push(`${key} = ?`);
        productValues.push(updateData[key]);
      }
    });

    if (productFields.length > 0) {
      const productSql = `UPDATE products SET ${productFields.join(", ")} WHERE id = ?`;
      productValues.push(productId);
      await connection.execute(productSql, productValues);
    }

    // 3. የ Product Descriptions Table Fields መለየት
    const descFields = [];
    const descValues = [];

    const allowedDescKeys = ["short_description", "long_description", "specifications", "ai_tags"];

    allowedDescKeys.forEach((key) => {
      if (updateData[key] !== undefined) {
        descFields.push(`${key} = ?`);
        descValues.push(updateData[key]);
      }
    });

    if (descFields.length > 0) {
      const descSql = `UPDATE product_descriptions SET ${descFields.join(", ")} WHERE product_id = ?`;
      descValues.push(productId);
      await connection.execute(descSql, descValues);
    }

    await connection.commit();
    return { status: 200, message: "Product updated successfully" };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const deleteProductModel = async (productId) => {
  const connection = await dbConnect.getConnection();

  try {
    await connection.beginTransaction();

    // 1. to check product exisit or not
    const [existing] = await connection.execute(
      `SELECT id FROM products WHERE id = ?`,
      [productId]
    );

    if (existing.length === 0) {
      await connection.rollback();
      return { status: 404, message: "Product not found" };
    }

    // 2. delete product image from products_image
    await connection.execute(
      `DELETE FROM product_images WHERE product_id = ?`,
      [productId]
    );

    // 3. delete product description from description table
    await connection.execute(
      `DELETE FROM product_descriptions WHERE product_id = ?`,
      [productId]
    );

    // 4. delte the product from products table
    await connection.execute(
      `DELETE FROM products WHERE id = ?`,
      [productId]
    );

    await connection.commit();
    return { status: 200, message: "Product deleted successfully" };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
const deleteProductImageModel = async (imageId) => {
  const connection = await dbConnect.getConnection();

  try {
    await connection.beginTransaction();

    // 1. ምስሉ በዳታቤዝ ውስጥ መኖሩን እና URL-ኡን ማግኘት
    const [imageRows] = await connection.execute(
      `SELECT id, image_url, is_primary FROM product_images WHERE id = ?`,
      [imageId]
    );

    if (imageRows.length === 0) {
      await connection.rollback();
      return { status: 404, message: "Image not found" };
    }

    const imageToDelete = imageRows[0];

    // 2. ምስሉ ከዳታቤዝ ማጥፋት
    await connection.execute(
      `DELETE FROM product_images WHERE id = ?`,
      [imageId]
    );

    await connection.commit();

    return { 
      status: 200, 
      message: "Image deleted successfully", 
      imageUrl: imageToDelete.image_url 
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
};


export { 
  createProduct, 
  getAllProduct, 
  searchProductModel, 
  getProductByIdModel, 
  addProductImagesModel, 
  updateProductModel,
  deleteProductModel,
  deleteProductImageModel 
};