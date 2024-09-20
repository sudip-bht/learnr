import { Router } from "express";
import { getVideos } from "../controllers/get.controller.js"; // Adjust the path as needed

export const getvideoRoute = Router();
getvideoRoute.get("/", getVideos);
