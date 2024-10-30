import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PollService {
    async create(data: any, userId: number) {
        try {
            if(data.options.length > 4)
                throw new Error('Max 4 options allowed');
            let response;
            if(!data.closesAt) {
                const closesAt = new Date();
                closesAt.setHours(closesAt.getHours() + 24);
                response = await prisma.poll.create({
                    data: {...data, userId, closesAt}
                })
            } else {
                response = await prisma.poll.create({
                    data: {...data, userId}
                })
            }
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async remove(pollId: string) {
        try {
            await prisma.poll.delete({
                where: {
                    id: parseInt(pollId)
                }
            })
            return true;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async closePoll(pollId: string) {
        try {
            const closesAt = new Date();
            await prisma.poll.update({
                where: {
                    id: parseInt(pollId)
                },
                data: {
                    closesAt
                }
            })
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async extendPoll(pollId: string, closesAt: Date) {
        try {
            await prisma.poll.update({
                where: {
                    id: parseInt(pollId)
                },
                data: {
                    closesAt
                }
            })
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default PollService;