// create product category middleware logic
const createProductCategoryMiddleware = (req, res, next) => {
  const { name, description } = req.body; 
  // check validation for product category
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, description"
    });
  } 
  next();
};

export { createProductCategoryMiddleware };