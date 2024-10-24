 


 const jwt = require('jsonwebtoken');
  
 const jwtMiddleware = (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1];
    console.log("inside middleware");
    console.log("token:",token);
    try{
      //jwt.verify() method is used to decrypt the token
      const jwtResponse = jwt.verify(token,"userpwd123");
      console.log(jwtResponse);
      req.payload = jwtResponse.userId;
      next()
    }
    catch(err){
      console.log(err);
      res.status(401).json("Authorization failed, please login")
      
    }
    next();
    
 }
  module.exports = jwtMiddleware;