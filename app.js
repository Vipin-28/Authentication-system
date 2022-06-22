import express from "express";
import User from "./routers/User.js";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(express.json());// we are using .json() in our controllers
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());// sothat we can able to read saved cookies
app.use(cors());

app.use("/api/v1", User);//since this is version 1

app.get("/", (req, res) => {
  res.send("Server is working");
});
