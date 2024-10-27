import express from "express";
import authController from "../../controllers/authController";

const { signup, login } = authController;

const router: any = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;