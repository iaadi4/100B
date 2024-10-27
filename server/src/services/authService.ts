import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface loginData {
    email: string,
    password: string
}

interface signupData extends loginData {
    name: string,
    year: string,
    branch: string
}

class AuthService {

    async signup({email, name, password, year, branch}: signupData) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = await bcrypt.hashSync(password, salt);
            const response = await prisma.user.create({
                data: {
                    email,
                    password: encryptedPassword,
                    name,
                    year,
                    branch
                }
            })
            return response;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }

    async login({email, password}: loginData) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            })
            if(!user) 
                return 404;
            const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
            if(!isPasswordCorrect)
                return 400;
            return true;
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default AuthService;