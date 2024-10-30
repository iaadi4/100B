import { Request, Response } from "express";
import s3Service from "../services/s3Service";
import statusCode from "../utils/statuscode";

const s3service = new s3Service();

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

const remove = async (req: Request, res: Response) => {
    try {
        await s3service.remove(req.body.filename);
        return res.status(statusCode.SUCCESS).json({
            message: 'File deleted'
        })
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: 'Failed to delete file'
        })
    }
}

export default {
    upload,
    remove
}