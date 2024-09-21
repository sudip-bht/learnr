import express from "express";
import {
  getQuizzesByVideo,
  getAllQuizzes,
} from "../controllers/get.controller.js";

export const getQuizRouter = express.Router();

getQuizRouter.get("/:quiz", getQuizzesByVideo);
getQuizRouter.get("/", getAllQuizzes);
