import PollService from "../services/pollService";
import { Request, Response } from "express";
import statusCode from "../utils/statuscode";

const pollService = new PollService();

const create = async (req: Request, res: Response) => {
    try {
        const response = await pollService.create(req.body, req.user.id);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to create poll",
            error: error
        });
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        await pollService.remove(req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll removed"
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to delete poll",
            error: error
        });
    }
}

const closePoll = async (req: Request, res: Response) => {
    try {
        await pollService.closePoll(req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll closed"
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to close poll",
            error: error
        });
    }
}

const extendPoll = async (req: Request, res: Response) => {
    try {
        await pollService.extendPoll(req.body.pollId, req.body.closesAt);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll closed"
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to close poll",
            error: error
        });
    }
}

export default {
    create,
    remove,
    closePoll,
    extendPoll
}