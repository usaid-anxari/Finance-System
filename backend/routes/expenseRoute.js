import { Router } from "express";
import { protection } from "../middleware/authMiddleware.js";
import { addExpanse, deleteExpanse, downloadReport, getExpanse } from "../controllers/expenseContoller.js";


const router = Router();

router.post("/add",protection,addExpanse)
router.delete("/delete/:id",protection,deleteExpanse)
router.get("/get",protection,getExpanse)
router.get('/download-report',protection,downloadReport)


export default router;