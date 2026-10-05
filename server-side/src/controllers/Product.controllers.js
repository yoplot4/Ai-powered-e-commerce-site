// import product category model
import fs from "fs";
import path from "path";
import { getCategoryId } from "../utils/categoryId.js";
import { createProduct, getAllProduct, 
  searchProductModel, getProductByIdModel, 
  addProductImagesModel, updateProductModel,
  deleteProductModel
  } from "../models/products.Model.js";

// controller for product creation
const createProductController = async (req, res) => {
  const product = req.body;

  // 1. File Check (ምስል መላኩን ማረጋገጥ)
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please provide a product image",
    });
  }

  // 2. Validation Check (ከ Specifications stringify በፊት መደረግ አለበት)
  if (
    !product.name ||
    !product.price ||
    !product.stock_quantity ||
    !product.sku ||
    !product.brand ||
    !product.short_description ||
    !product.long_description ||
    !product.specifications ||
    !product.category_name
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required product information",
    });
  }

  // 3. Image URL ማዘጋጀት
  product.image_url = `/uploads/${req.file.filename}`;

  // 4. Specifications-ን በጥንቃቄ ወደ JSON String መቀየር
  try {
    if (typeof product.specifications === "object") {
      product.specifications = JSON.stringify(product.specifications);
    }
  } catch (err) {
    console.error("Invalid JSON format for specifications", err);
  }

  try {
    // 5. Category ID ማግኘት
    if (product.category_name) {
      const categoryId = await getCategoryId(product.category_name);
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: `Category '${product.category_name}' not found`,
        });
      }
      product.category_id = categoryId;
    }

    // 6. Product-ን በ Model በኩል መመዝገብ
    const created = await createProduct(product);

    return res.status(201).json({
      success: true,
      message: "Successfully added new product",
      data: created,
    });

  } catch (error) {
    console.error("Error creating product:", error);

    return res.status(500).json({
      success: false,
      message: "Unexpected internal server error",
      error: error.message,
    });
  }
};

const getAllProductController = async (req, res) => {
  // write try catch block to handle errors
  try {
    // call the model to get products
    const products = await getAllProduct ();
    
    const formattedProducts = products.map((prod) => ({
      ...prod,
      specifications: prod.specifications ? JSON.parse(prod.specifications) : null,
    }));
    
    console.log(formattedProducts);
    

    return res.status(200).json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "faled to fetch products",
      error: error.message
    })
  }
}
const searchProductsController = async (req, res) => {
  try {
    const { q } = req.query; // e.g. ?q=Dell

    const products = await searchProductModel(q || "");

    const formattedProducts = products.map((prod) => ({
      ...prod,
      specifications: prod.specifications ? JSON.parse(prod.specifications) : null,
    }));

    return res.status(200).json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error.message,
    });
  }
};
const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params; // URL ላይ ያለውን ID ይቀበላል

    const product = await getProductByIdModel(id);

    // ምርቱ ዳታቤዝ ውስጥ ካልተገኘ
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' not found`,
      });
    }

    // Specifications JSON-ን ወደ Object መለወጥ
    const formattedProduct = {
      ...product,
      specifications: product.specifications ? JSON.parse(product.specifications) : null,
    };

    return res.status(200).json({
      success: true,
      data: formattedProduct,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);
    return res.status(500).json({
      success: false,
      message: "Unexpected internal server error",
      error: error.message,
    });
  }
};
const addProductImagesController = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. የፋይል መኖርን ማረጋገጥ (`req.files` ለ multiple upload ነው የሚያገለግለው)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image file",
      });
    }

    // 2. የፋይሎቹን Relative Path ማዘጋጀት
    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

    // 3. Model ጥሪ ማድረግ
    const result = await addProductImagesModel(id, imageUrls);

    if (result.status === 404) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Product images uploaded successfully",
      count: result.count,
      images: imageUrls,
    });

  } catch (error) {
    console.error("Error uploading product images:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while uploading images",
      error: error.message,
    });
  }
};
const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = { ...req.body };

    // 1. ምንም የሚሻሻል መረጃ ካልተላከ
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // 2. Category Name ከተላከ ID-ውን ማግኘት
    if (updateFields.category_name) {
      const categoryId = await getCategoryId(updateFields.category_name);
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: `Category '${updateFields.category_name}' not found`,
        });
      }
      updateFields.category_id = categoryId;
      delete updateFields.category_name;
    }

    // 3. Specifications Object ከሆነ ወደ String ማቀናጀት
    if (updateFields.specifications && typeof updateFields.specifications === "object") {
      updateFields.specifications = JSON.stringify(updateFields.specifications);
    }

    // 4. Model ጥሪ ማድረግ
    const result = await updateProductModel(id, updateFields);

    if (result.status === 404) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating product",
      error: error.message,
    });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProductModel(id);

    //  if product does not exist
    if (result.status === 404) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting product",
      error: error.message,
    });
  }
};
const deleteProductImageController = async (req, res) => {
  try {
    const { imageId } = req.params;

    // 1. Model በመጥራት ከዳታቤዝ ማጥፋት
    const result = await deleteProductImageModel(imageId);

    if (result.status === 404) {
      return res.status(404).json({
        success: false,
        message: result.message,
      });
    }

    // 2. ፋይሉን ከ Server Storage (uploads folder) ማጥፋት
    if (result.imageUrl) {
      const filePath = path.join(process.cwd(), result.imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete physical file:", err);
      });
    }

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    console.error("Error deleting product image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting image",
      error: error.message,
    });
  }
};

export { 
  createProductController,
  getAllProductController,
  searchProductsController,
  getProductByIdController,
  addProductImagesController,
  updateProductController,
  deleteProductController,
  deleteProductImageController  
};