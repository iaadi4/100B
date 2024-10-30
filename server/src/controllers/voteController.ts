import { Request, Response } from "express";
import VoteService from "../services/voteService";

const voteService = new VoteService();

enum statusCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}

const vote = async (req: Request, res: Response) => {
    try {
        const response = await voteService.giveVote(req.body.option, req.user.id, req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to vote"
        })
    }
}

export default {
    vote
}