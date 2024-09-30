import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.json());

app.use(cors());
app.use(cookieParser());

dotenv.config();

const __dirname = path.resolve();

// app.get("/", (request, response) => {
//   response.status(200).send("Server is live");
// });
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("/todos", todoRoutes);
app.use("/users/auth", authRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((reposne) => {
    console.log("DB connected successfully!!");
    app.listen(process.env.PORT_NO, () => {
      console.log(`app listens to port ${process.env.PORT_NO}`);
      console.log("");
    });
  })
  .catch((error) => console.log(error));
