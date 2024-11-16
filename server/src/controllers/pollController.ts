import PollService from "../services/pollService";
import { Request, Response } from "express";
import statusCode from "../utils/statuscode";

const pollService = new PollService();

const create = async (req: Request, res: Response) => {
    console.log("Creating poll");
    try {
        console.log(req.body);
        const response = await pollService.create(req.body, req.user.id);
        console.log(response);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        console.log(error);
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to create poll",
            error: error
        });
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { pollId } = req.body;
        if (!pollId) {
            return res.status(400).json({ message: "Poll ID is required" });
        }

        console.log('Received pollId:', pollId);

        await pollService.remove(pollId);

        return res.status(200).json({
            message: "Poll removed",
        });
    } catch (error) {
        console.error('Error in controller:', error);

        return res.status(500).json({
            message: "Failed to delete poll",
            error: (error as any).message,
        });
    }
};
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

const getPoll = async (req: Request, res: Response) => {
    try {
        const poll = await pollService.getPoll(req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            poll
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to fetch poll",
            error: error
        });
    }
}

const getPolls = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { pageNo } = req.query; 
        console.log('Page Number:', pageNo);
        const pageNumber = parseInt(pageNo as string, 10);
        if (!pageNo || isNaN(pageNumber)) {
            return res.status(400).json({ message: "Invalid page number" });
        }


        const polls = await pollService.getPolls(pageNo as string);
        return res.status(statusCode.SUCCESS).json({
            polls
        })
    } catch (error) {
        console.log("controllee error",error);
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to fetch polls",
            error: error
        });
    }
}

const getPollsByDateCreation = async (req: Request, res: Response) => {
    try {
        const polls = await pollService.getPollsByDateCreation(req.body.pageNo, req.body.ascending);
        return res.status(statusCode.SUCCESS).json({
            polls
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to fetch polls",
            error: error
        });
    }
}

const getPollByYearOrBranch = async (req: Request, res: Response) => {
    try {
        const { year, branch, pageNo } = req.body;
        const polls = await pollService.getPollByYearOrBranch(pageNo, year, branch);
        return res.status(statusCode.SUCCESS).json({
            polls
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to fetch polls",
            error: error
        });
    }
}

const getPollsByTitle = async (req: Request, res: Response) => {
    try {
        const polls = await pollService.getPollsByTitle(req.body.pageNo, req.body.searchTitle);
        return res.status(statusCode.SUCCESS).json({
            polls
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to fetch polls",
            error: error
        });
    }
}

export default {
    create,
    remove,
    closePoll,
    extendPoll,
    getPolls,
    getPollsByTitle,
    getPoll,
    getPollsByDateCreation,
    getPollByYearOrBranch
}