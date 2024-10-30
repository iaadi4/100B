import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class VoteService {
    async giveVote(option: string, userId: number, pollId: string) {
        try {
            const response = await prisma.vote.create({
                data: {
                    option,
                    userId,
                    pollId: parseInt(pollId)
                }
            })
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default VoteService;