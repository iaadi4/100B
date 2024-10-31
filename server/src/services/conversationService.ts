import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ConversationService {
    async getWithMessage(conversationId: string) {
        try {
            const response = await prisma.conversation.findFirst({
                where: {
                    id: parseInt(conversationId)
                },
                select: {
                    messages: true
                }
            })
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default ConversationService;