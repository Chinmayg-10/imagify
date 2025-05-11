import express from "express";
import { generateImage } from "../controller/ImageController.js"; 
import UserMiddleware from "../middlewares/auth.js";
const ImageRouter=express.Router();
ImageRouter.post("/generate",UserMiddleware,generateImage);
export default ImageRouter;