import PollService from "../services/pollService";
import { Request, Response } from "express";

const pollService = new PollService();

enum statusCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}

const create = async (req: Request, res: Response) => {
    try {
        const response = await pollService.create(req.body, req.user.id);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to create poll"});
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        await pollService.remove(req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll removed"
        })
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to delete poll"});
    }
}

const closePoll = async (req: Request, res: Response) => {
    try {
        await pollService.closePoll(req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll closed"
        })
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to close poll"});
    }
}

const extendPoll = async (req: Request, res: Response) => {
    try {
        await pollService.extendPoll(req.body.pollId, req.body.closesAt);
        return res.status(statusCode.SUCCESS).json({
            message: "Poll closed"
        })
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to close poll"});
    }
}

export default {
    create,
    remove,
    closePoll,
    extendPoll
}