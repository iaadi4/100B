import { PrismaClient } from "@prisma/client";
import uploadFile from "../helper/s3Upload";

const prisma = new PrismaClient();

interface announcementData {
    announcementId: string
    title: string
    content? : string
    attachment?: string
}

class AnnouncementService {
    async create(file: any, data: announcementData, userId: number) {
        try {
            let response;
            if(file) {
                const s3Url = await uploadFile(file);
                response = await prisma.announcement.create({
                    data: {...data, userId, attachment: s3Url}
                })
            } else {
                response = await prisma.announcement.create({
                    data: {...data, userId}
                })
            }
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async update(data: announcementData) {
        try {
            const announcementId = data.announcementId;
            //@ts-ignore
            delete data.announcementId
            const response = await prisma.announcement.update({
                where: {
                    id: parseInt(announcementId)
                },
                data: {...data}
            })
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async remove(announcementId: string) {
        try {
            await prisma.announcement.delete({
                where: {
                    id: parseInt(announcementId)
                }
            })
            return true;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default AnnouncementService;