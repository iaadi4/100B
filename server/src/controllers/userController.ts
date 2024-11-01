import { Request, Response } from "express";
import UserService from "../services/userService";
import statusCode from "../utils/statuscode";

const userService = new UserService();

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
            message: "Failed to update user details",
            error: error
        })
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const response = await userService.getAll(req.user.id);
        return res.status(statusCode.SUCCESS).json({response});
    } catch (error) {
        return res.status(statusCode.INTERNAL_ERROR).json({
            message: "Failed to update user details",
            error: error
        })
    }
}

export default {
    update,
    getAll
}