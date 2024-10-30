import { Request, Response } from "express";
import UserService from "../services/userService";

const userService = new UserService();

enum statusCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    INTERNAL_ERROR = 500
}

const update = async(req: Request, res: Response) => {
    try {
        if(req.body.email) {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "Email cannot be updated"
            })
        }
        const response = await userService.update(req.body, req.user.id);
        return res.status(statusCode.SUCCESS).json({response});
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to update user details"
        })
    }
}

export default {
    update
}