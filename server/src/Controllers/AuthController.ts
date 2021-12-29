import express from 'express';
import AuthService from "../Services/AuthService";
import createError from "http-errors";

class AuthController {
    static async register(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await AuthService.register(req.body);

            res.status(200).json({
                error: false,
                message: 'User created successfully',
                data: {user},
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async login(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await AuthService.login(req.body);

            res.status(200).json({
                error: false,
                message: 'User logged in successfully',
                data: {user},
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }

    static async googleLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
        const {tokenId} = req.body;

        try {
            const user = await AuthService.googleLogin(tokenId);

            res.status(200).json({
                error: false,
                message: 'User logged in successfully',
                data: {user},
            });
        } catch (e: any) {
            next(createError(e.statusCode, e.message));
        }
    }
}

export default AuthController;
