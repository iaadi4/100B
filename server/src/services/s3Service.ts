import { PrismaClient } from "@prisma/client";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import uploadFile from "../helper/s3Upload";
import config from "../config/serverConfig";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = config;

const prisma = new PrismaClient();

interface notesData {
    title: string
    subject: string
    year: string
    branch: string
}

const s3Client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
    },
});

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

    async remove(filename: string) {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: filename
            }
            const command = new DeleteObjectCommand(params);
            await s3Client.send(command);
            return true;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default s3Service;