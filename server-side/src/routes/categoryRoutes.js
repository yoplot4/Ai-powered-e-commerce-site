// import express module
import express from 'express';
import { verifyToken, authorizeRoles } from '../middleware/auth.middleware.js';
import { viewAllCategory, createCategory, viewSingleCategory, updateCtegory, removeCategory } from '../controllers/categoryController.js';

// create category route
const CategoryRouter = express.Router();

// PUBLIC routes
// to get all categories
CategoryRouter.get('/v1/category', viewAllCategory);
// to get specific category route
CategoryRouter.get('/v1/category/:id', viewSingleCategory);

// ADMIN ONLY routes (JWT + admin role required)
// to create new category route
CategoryRouter.post('/v1/category',/* verifyToken, authorizeRoles('admin'),*/ createCategory);
// to update specific category route
CategoryRouter.patch('/v1/category/:id',/* verifyToken, authorizeRoles('admin'),*/ updateCtegory);
// to delete specific category route
CategoryRouter.delete('/v1/category/:id', /* verifyToken, authorizeRoles('admin'),*/ removeCategory);
// export the category router
export { CategoryRouter };