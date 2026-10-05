// import express to create server
import express from "express";
import path from "path";
//import database connection from config/dbConnect.js
import dbConnect from "./config/dbConnect.js";

//import routes
import { productRout } from "./src/routes/productRoutes.js";
import { UserRouter } from "./src/routes/userRoutes.js";
import { cartRout } from "./src/routes/cartRoutes.js";
import { addressRoute } from "./src/routes/addressRoutes.js";
import { authRouter } from "./src/routes/authRoutes.js";
import { CategoryRouter } from "./src/routes/categoryRoutes.js";
import { orderRoute } from "./src/routes/orderRoutes.js";
import { paymentRoute } from "./src/routes/paymentRoutes.js";
import { wishlistRoute } from "./src/routes/wishlistRoutes.js";
import { reviwRoutes } from "./src/routes/reviewRoutes.js";
import { aiRoute } from "./src/routes/aiRoutes.js";


const app = express();
const RuningPort = process.env.PORT || 4050;

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("This is the home page of the Ai-powered e-commerce site server");
});

//app.use("/api/products", router);

app.use("/api", productRout)// tasted route
app.use("/api", UserRouter);// tasted route
app.use('/api', cartRout);// tasted route
app.use("/api", addressRoute);// tasted route
app.use("/api", authRouter);// tasted route
app.use('/api', CategoryRouter);// tasted route
app.use("/api", orderRoute);// tasted route
app.use('/api', paymentRoute);// tasted route
app.use("/api", wishlistRoute)// tasted route
app.use("/api", reviwRoutes);// tasted route
app.use('/api', aiRoute); // last tasted route

// connect to the database
dbConnect.getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });



app.listen(RuningPort, () => {
  console.log(`Server is running on port ${RuningPort}`);
});

export default app;