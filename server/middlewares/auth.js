import jwt from "jsonwebtoken"
function UserMiddleware(req,res,next){
    const token=req.headers.token;
    const DecodedData=jwt.verify(token,process.env.JWT_SECRET);
    if(DecodedData){
        req.userId=DecodedData.id;
        next();
    }
    else{
        return res.json({
            success:false,
            message:"incorrect credentials"
        })
    }
}
export default UserMiddleware;