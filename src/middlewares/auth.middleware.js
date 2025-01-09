import ApiError from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt from 'jsonwebtoken'
import {User} from '../modles/user.model.js'



export const verifyJwt = asynchandler(  async(req, res, next,)=>{
 try {
    const token =  req.cookies?.accessToken || req.Header('Authorization')?.replace('Bearer', "")
         if(!token){
           throw new ApiError(401, "Unauthorised request")
         }
     
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   
      if(!user){
       //disccuss about frontend
       throw new ApiError(401, "invalid access token")
      }
   
      req.user = user
      next()
 } catch (error) {
     throw new ApiError(401, error?.message || "inavalid token")
 }
   


})