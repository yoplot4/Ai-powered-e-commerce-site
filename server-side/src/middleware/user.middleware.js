//middleware for user creation
const createUserMiddleware = (req, res, next) => {
  const { firstName, middleName, lastName, email, password, role} = req.body;

  // check validation for user
  if( !firstName || !middleName || !lastName || !email || !password || !role){
    return res.status(400).json({
      success:false,
      message:"Missing required fields: id, firstName, lastName, email, password, role"
    })
  } 
  // check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    return res.status(400).json({
      success:false,
      message:"Invalid email format"
    })
  }
  // check if password is at least 8 characters long
  if(password.length < 8){
    return res.status(400).json({ 
      success:false,
      message:"Password must be at least 8 characters long"
    })
  }
  next();
}



export { createUserMiddleware };