import express from "express";
import authController from "../../controllers/authController";
import handleRefreshToken from "../../controllers/refreshTokenController";
import handleLogout from "../../controllers/logoutController";

const { signup, login } = authController;

const router: any = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);

export default router;