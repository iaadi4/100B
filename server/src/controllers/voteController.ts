import { Request, Response } from "express";
import VoteService from "../services/voteService";
import statusCode from "../utils/statuscode";

const voteService = new VoteService();

const vote = async (req: Request, res: Response) => {
    try {
        const response = await voteService.giveVote(req.body.option, req.user.id, req.body.pollId);
        return res.status(statusCode.SUCCESS).json({
            response
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to vote",
            error: error
        })
    }
}

const deleteVote = async (req: Request, res: Response) => {
    try {
      const { voteId } = req.body;
  
      if (!voteId) {
        return res.status(400).json({ message: 'Vote ID is required' });
      }
  
      const response = await voteService.deleteVote(parseInt(voteId));
      return res.status(statusCode.SUCCESS).json({
        message: 'Vote removed successfully',
        response,
      });
    } catch (error) {
      console.error('Error in deleteVote controller:', error);
      return res.status(statusCode.INTERNAL_ERROR).json({
        message: 'Failed to delete vote',
        error: (error as any).message  || error,
      });
    }
  };
    
  
  


export default {
    vote,
    deleteVote
}