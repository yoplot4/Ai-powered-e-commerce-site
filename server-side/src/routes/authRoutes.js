
// import express module
import express from 'express';
import { registerUserMiddleware } from "../middleware/auth.middleware.js";
import { registerUserController, loginUserController } from "../controllers/authController.js"
// create user register route
const authRouter = express.Router();

// create user register route (public - no JWT needed)
authRouter.post('/v1/auth/register', registerUserMiddleware, registerUserController);

// create user login route (public - no JWT needed)
authRouter.post('/v1/auth/login', loginUserController);

export { authRouter };