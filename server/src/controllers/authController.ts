import AuthService from "../services/authService";
import { Request, Response} from "express";
import statusCode from "../utils/statuscode";

const authService = new AuthService();

const signup = async (req: Request, res: Response) => {
    try {
        const response = await authService.signup(req.body);
        if(response == 400) {
            return res.status(statusCode.BAD_REQUEST).json({
                message: "Invalid email"
            })
        }
        return res.status(statusCode.SUCCESS).json({response});
    } catch (error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to signup"});
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const response = await authService.login(req.body);
        if(response == 404)
            return res.status(statusCode.NOT_FOUND).json({error: "user not found"});
        if(response == 400)
            return res.status(statusCode.BAD_REQUEST).json({error: "incorrect password"});
        const { refreshToken, accessToken } = response;
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24*60*60*1000 });
        return res.status(statusCode.SUCCESS).json({accessToken: accessToken});
    } catch(error) {
        console.log('Something went wrong in the controller layer');
        return res.status(statusCode.INTERNAL_ERROR).json({error: "Failed to login"});
    }
}

export default {
    signup,
    login
}