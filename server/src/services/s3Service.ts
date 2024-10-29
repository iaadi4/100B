import { PrismaClient } from "@prisma/client";
import uploadFile from "../helper/s3Upload";

const prisma = new PrismaClient();

interface notesData {
    title: string
    subject: string
    year: string
    branch: string
}

class s3Service {
    async upload(file: any, userId: number, {title, subject, year, branch}: notesData) {   
        try {
            const result = await uploadFile(file);
            if(!result)
                throw new Error('Failed to upload file');
            const note = await prisma.note.create({
                data: {
                    title,
                    subject,
                    s3Url: result,
                    branch,
                    year,
                    userId
                }
            })
            return note;
        } catch(error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default s3Service;