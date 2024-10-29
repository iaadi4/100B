import express from "express";
import multer from "multer";
import authController from "../../controllers/authController";
import handleRefreshToken from "../../controllers/refreshTokenController";
import handleLogout from "../../controllers/logoutController";
import upload from "../../controllers/s3Controller";
import { verifyJwt } from "../../middlewares/verifyJwt";

const { signup, login } = authController;

const router: any = express.Router();
const uploadHandle = multer({ storage: multer.memoryStorage() });

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);
router.post('/upload', verifyJwt, uploadHandle.single('file'), upload);

export default router;