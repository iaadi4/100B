import express, { NextFunction, Request, Response } from "express";
import multer, { MulterError, FileFilterCallback } from "multer";
import authController from "../../controllers/authController";
import handleRefreshToken from "../../controllers/refreshTokenController";
import handleLogout from "../../controllers/logoutController";
import s3Controller from "../../controllers/s3Controller";
import pollController from "../../controllers/pollController";
import { verifyJwt } from "../../middlewares/verifyJwt";

enum statusCode {
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}

const router: any = express.Router();
const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
    if(file.mimetype.split('/')[0] == "application" || file.mimetype.split('/')[0] == "image") {
        cb(null, true);
    } else {
        //@ts-ignore
        cb(new MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

const uploadHandle = multer({
    storage,
    fileFilter,
    limits: { fileSize: 50000000, files: 1}
})

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/refresh', handleRefreshToken);
router.get('/logout', handleLogout);
router.post('/upload', verifyJwt, uploadHandle.single('file'), s3Controller.upload);
router.post('/delete-file', verifyJwt, s3Controller.remove);
router.post('/poll', verifyJwt, pollController.create);
router.delete('/poll', verifyJwt, pollController.remove);
router.patch('/close-poll', verifyJwt, pollController.closePoll);
router.patch('/extend-poll', verifyJwt, pollController.extendPoll);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof MulterError) {
        if(err.code == "LIMIT_UNEXPECTED_FILE") {
            return res.status(statusCode.BAD_REQUEST).json({
                error: "File type not supported"
            })
        } else if(err.code == "LIMIT_FILE_SIZE") {
            return res.status(statusCode.BAD_REQUEST).json({
                error: "File size too large"
            })
        } else if(err.code == "LIMIT_FILE_COUNT") {
            return res.status(statusCode.BAD_REQUEST).json({
                error: "Too many files"
            })
        }
    }
    next();
})

export default router;