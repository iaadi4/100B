import sender from "../config/emailConfig";
import config from "../config/serverConfig";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { EMAIL } = config;

class EmailService {
    async sendOtp(id: string, mailTo: string) {
        try {
            let randomNumber: string | number = Math.floor(Math.random() * 1000000);
            randomNumber = randomNumber.toString().padStart(6, "0");

            prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    otp: randomNumber
                }
            })

            sender.sendMail({
                from: EMAIL,
                to: mailTo,
                subject: 'Agora otp',
                text: randomNumber
            })
            return randomNumber;
        } catch (error) {
            throw error;
        }
    }
}

export default EmailService;