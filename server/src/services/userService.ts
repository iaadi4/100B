import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
    async update(data: any, userId: number) {
        try {
            const response = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {...data}
            })
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default UserService;