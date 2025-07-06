import { Router } from "express";
import { getUser, loginUser, registerUser, uploadProfile } from "../controllers/authController.js";
import { protection } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/getuser',protection,getUser)
router.post("/upload-image",upload.single("image"),uploadProfile)

export default router;