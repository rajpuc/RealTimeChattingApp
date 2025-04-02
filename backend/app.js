import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/api.js";
import { connectToMongoDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./src/lib/socket.js";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL (Make sure it matches your frontend URL)
    credentials: true, // Allow sending credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());
app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));

app.use("/api/v1", router);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}

server.listen(process.env.PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening on port ${process.env.PORT}`);
});
