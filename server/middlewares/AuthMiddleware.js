const {verify}= require("jsonwebtoken");
const validateToken = (req,res,next)=>{
const accessToken= req.header("accessToken");   
if  (!accessToken)return res.json({error:"Hey! user not logged in!"})

try{
  const  validToken= verify(accessToken,"important")
  req.user = validToken;
   const username = validToken.username;  
  if(validToken){
         return next();
     }

}catch(error){
return res.json({error:err})
}

}
module.exports = {validateToken}