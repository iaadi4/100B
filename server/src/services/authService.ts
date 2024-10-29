import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/serverConfig";

const prisma = new PrismaClient();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = config;

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
            console.log("{email, name, password, year, branch}",email, name, password, year, branch)
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
            console.log(error,'Something went wrong in the service layer');
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
            const accessToken = jwt.sign({id: user.id, email: user.email}, ACCESS_TOKEN_SECRET!, { expiresIn : "30s" });
            const refreshToken = jwt.sign({id: user.id, email: user.email}, REFRESH_TOKEN_SECRET!, { expiresIn : "1w" });
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    refreshToken
                }
            })
            return { accessToken, refreshToken };
        } catch (error) {
            console.log('Something went wrong in the service layer');
            throw error;
        }
    }
}

export default AuthService;