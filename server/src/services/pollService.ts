import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Ifilters {
    year?: string
    branch?: string
}

class PollService {
    async create(data: any, userId: number) {
        try {
            if (data.options.length > 4)
                throw new Error('Max 4 options allowed');
            let response;
            if (!data.closesAt) {
                const closesAt = new Date();
                closesAt.setHours(closesAt.getHours() + 24);
                response = await prisma.poll.create({
                    data: { ...data, userId, closesAt }
                })
            } else {
                response = await prisma.poll.create({
                    data: { ...data, userId }
                })
            }
            return response;
            console.log('Poll created');
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

    async getPoll(pollId: string) {
        try {
            console.log('PollId:', pollId);
            const poll = await prisma.poll.findFirst({
                where: {
                    id: parseInt(pollId)
                }
            })
            return poll;
        } catch (error) {
            console.log('Something went wrong in the service layer',error);
            throw error;
        }
    }

    async getPollsByDateCreation(pageNo: string, ascending: string) {
        try {
            const polls = await prisma.poll.findMany({
                skip: (parseInt(pageNo) - 1) * 4,
                take: 4,
                orderBy: {
                    createdAt: ascending === 'true' ? 'asc' : 'desc'
                }
            })
            return polls;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async getPollByYearOrBranch(pageNo: string, year?: string, branch?: string) {
        try {
            const filters: Ifilters = {};
            if (year) filters.year = year;
            if (branch) filters.branch = branch;
            const polls = await prisma.poll.findMany({
                skip: (parseInt(pageNo) - 1) * 4,
                take: 4,
                where: filters
            })
            return polls;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async getPolls(pageNo: string) {
        const polls = await prisma.poll.findMany({
          skip: (parseInt(pageNo) - 1) * 4,
          take: 4,
          include: { votes: true },
        });
      
        return polls.map((poll) => ({
          ...poll,
          voteCounts: poll.votes.reduce((acc: { [key: string]: number }, vote) => {
            acc[vote.option] = (acc[vote.option] || 0) + 1;
            return acc;
          }, {}), // Explicitly defining the accumulator type
          votes: poll.votes.map((vote) => ({
            id: vote.id, // Include voteId in the response
            option: vote.option,
          })),
        }));
      }
      

    async getPollsByTitle(pageNo: string, searchTitle: string) {
        try {
            const polls = await prisma.poll.findMany({
                skip: (parseInt(pageNo) - 1) * 4,
                take: 4,
                where: {
                    title: {
                        contains: searchTitle,
                        mode: 'insensitive'
                    }
                }
            })
            return polls;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default PollService;