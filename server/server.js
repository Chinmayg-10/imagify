import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; 
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js"
import ImageRouter from "./routes/imageRouter.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

await connectDB();

app.use("/user",userRouter);
app.use("/image",ImageRouter);
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
