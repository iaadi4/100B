import { Request, Response } from "express";
import NoteService from "../services/noteService";
import statusCode from "../utils/statuscode";

const noteService = new NoteService();

const upload = async (req: Request, res: Response) => {
    try {
        const response = await noteService.upload(req.file, req.user.id, req.body);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: 'Failed to upload file',
            error: error
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        await noteService.remove(req.body.filename);
        return res.status(statusCode.SUCCESS).json({
            message: 'File deleted'
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: 'Failed to delete file',
            error: error
        })
    }
}

export default {
    upload,
    remove
}