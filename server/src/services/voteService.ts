import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class VoteService {
    async giveVote(option: string, userId: number, pollId: string) {
        try {
          const existingVote = await prisma.vote.findUnique({
            where: {
              userId_pollId: { userId, pollId: parseInt(pollId) }, // Check for an existing vote by the user for this poll
            },
          });
      
          if (existingVote) {
            throw new Error("User has already voted on this poll");
          }
      
          const response = await prisma.vote.create({
            data: {
              option,
              userId,
              pollId: parseInt(pollId),
            },
          });
      
          return response;
        } catch (error) {
          console.log('Error in VoteService.giveVote:', error);
          throw error;
        }
      }
      
      async deleteVote(voteId: number) {
        try {
          console.log('Deleting vote with id:', voteId);
      
          const deletedVote = await prisma.vote.delete({
            where: {
              id: voteId,
            },
          });
      
          console.log('Deleted vote:', deletedVote);
          return deletedVote;
        } catch (error) {
          console.error('Error in VoteService.deleteVote:', error);
          throw error;
        }
      }
      
}

export default VoteService;