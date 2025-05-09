import express from "express"
import userController from "../controller/userController.js";
const { registerUser, LoginUser,userCredits } = userController;
import UserMiddleware from "../middlewares/auth.js";
const userRouter=express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",LoginUser);
userRouter.get("/credits",UserMiddleware,userCredits);
userRouter.patch("/credits", UserMiddleware, userCredits);
export default userRouter;