import { Request, Response } from "express";
import AnnouncementService from "../services/announcementService";
import statusCode from "../utils/statuscode";

const announcementService = new AnnouncementService();

const create = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const response = await announcementService.create(req.file, req.body, req.user.id);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to create announcement",
            error: error
        })
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const response = await announcementService.update(req.body);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to update announcement",
            error: error
        })
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const response = await announcementService.remove(req.body.announcementId);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to delete announcement",
            error: error
        })
    }
}

export default {
    create,
    update,
    remove
}