import { Router } from "express";

import { user } from "./src/modules/user/index.js";

export const router = Router();

router.use("/user", user);
