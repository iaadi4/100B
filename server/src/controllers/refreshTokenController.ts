import jwt from "jsonwebtoken"
import config from "../config/serverConfig";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = config;

enum statusCode {
    SUCCESS = 200,
    FORBIDDEN = 403,
    UNAUTHORIZED = 401,
    NOTFOUND = 404
}

const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.status(statusCode.UNAUTHORIZED).json({
            SUCCESS: false,
            message: 'Unauthorized access'
        });
    }
    const refreshToken = cookies.jwt;
    const user = await prisma.user.findFirst({
        where: {
            refreshToken
        }
    });
    if(!user) {
        return res.status(statusCode.NOTFOUND).json({
            SUCCESS: false,
            message: 'User not found'
        });
    }
    jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if(err || user.id != decoded.id) {
                return res.status(statusCode.FORBIDDEN).json({
                    SUCCESS: false,
                    error: err
                });
            }
            const accessToken = jwt.sign({id: user.id, email: user.email, role: user.role}, ACCESS_TOKEN_SECRET!, {expiresIn: "15m"})
            return res.status(statusCode.SUCCESS).json({
                accessToken: accessToken
            });
        }
    )
}

export default handleRefreshToken;