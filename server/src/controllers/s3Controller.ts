import { Request, Response } from "express";
import s3Service from "../services/s3Service";

const s3service = new s3Service();

enum statusCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}

const upload = async (req: Request, res: Response) => {
    try {
        const response = await s3service.upload(req.file, req.user.id, req.body);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: 'Failed to upload file'
        })
    }
}

export default upload;