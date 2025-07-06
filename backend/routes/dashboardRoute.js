import { Router } from "express";
import { protection } from "../middleware/authMiddleware.js";
import {gatDashboardData} from "../controllers/dashboardController.js";

const router = Router();

router.get('/',protection,gatDashboardData)

export default router;