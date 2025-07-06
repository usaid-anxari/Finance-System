import { Router } from "express";
import { protection } from "../middleware/authMiddleware.js";
import { addIncome, deleteIncome, downloadReport, getIncome } from "../controllers/incomeController.js";


const router = Router();

router.post("/add",protection,addIncome)
router.delete("/delete/:id",protection,deleteIncome)
router.get("/get",protection,getIncome)
router.get('/download-report',protection,downloadReport)


export default router;