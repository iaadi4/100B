import { Request, Response } from "express";
import MessageService from "../services/messageService";
import statusCode from "../utils/statuscode";

const messageService = new MessageService();

const create = async (req: Request, res: Response) => {
    try {
        const response = await messageService.create({...req.body, senderId: req.user.id});
        return res.status(statusCode.SUCCESS).json({response});
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to create message",
            error: error
        })
    }
}

export default {
    create
}