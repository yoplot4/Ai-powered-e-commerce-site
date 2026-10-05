// Import express to create Express Router
import express from "express";
import { verifyToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { createProductController, getAllProductController, 
        searchProductsController, getProductByIdController,
        addProductImagesController, updateProductController,
        deleteProductController,deleteProductImageController
      } from "../controllers/Product.controllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const productRout = express.Router();

// PUBLIC routes (no JWT needed)
// Get all products
productRout.get("/v1/products", getAllProductController);

// Search products
productRout.get("/v1/products/search", searchProductsController );

// Get single product
productRout.get("/v1/products/:id", getProductByIdController);

// ADMIN ONLY routes (JWT + admin role required)
// Add product
productRout.post("/v1/products", /* verifyToken, authorizeRoles('admin'),*/ upload.single("image"), createProductController );

// Update product
productRout.patch("/v1/products/:id", /*verifyToken, authorizeRoles('admin'),*/ updateProductController);

// Delete product
productRout.delete("/v1/products/:id",/* verifyToken, authorizeRoles('admin'),*/ deleteProductController);

// Add product image
productRout.post("/v1/products/:id/images", /* verifyToken, authorizeRoles('admin'),*/upload.array("images", 5), addProductImagesController);

// Delete product image
productRout.delete("/v1/products/images/:imageId", /* verifyToken, authorizeRoles('admin'),*/ deleteProductImageController);

export { productRout };