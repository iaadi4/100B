import express from "express";
import authController from "../../controllers/authController";
import handleRefreshToken from "../../controllers/refreshTokenController";

const { signup, login } = authController;

const router: any = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);

export default router;