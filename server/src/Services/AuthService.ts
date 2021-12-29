import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import JWTService from "./JWTService";
import createError from "http-errors";
import {OAuth2Client} from 'google-auth-library';

const prisma = new PrismaClient();
const client = new OAuth2Client(`${process.env.GOOGLE_CLIENT_ID}`);

class AuthService {
    static async register(data: any) {
        const hash = await bcrypt.hash(data.password, 10);
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: data.username,
                    },
                    {
                        email: data.email,
                    },
                ],
            },
        });
        if (user) {
            throw new createError.NotFound('User already exist');
        }
        user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hash
            },
        });
        return {...user, accessToken: await JWTService.signWrapper(user)}
    }

    static async login(data: any) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            }
        })
        if (!user) {
            throw new createError.NotFound('User not registered');
        } else {
            const isValid = await bcrypt.compare(data.password, user.password);
            if (isValid)
                return {...user, accessToken: await JWTService.signWrapper(user)}
            throw new createError.Unauthorized('Email address or password invalid');
        }
    }

    static async googleLogin(tokenId: any) {
        const response = await client.verifyIdToken({idToken: tokenId, audience: `${process.env.GOOGLE_CLIENT_ID}`});
        const email = response.getPayload()?.email ?? '';
        const username = response.getPayload()?.name ?? '';

        let user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: `${email}${process.env.ACCESS_TOKEN_SECRET}`
                },
            });
        }

        return {...user, accessToken: await JWTService.signWrapper(user)}
    }
}

export default AuthService;
