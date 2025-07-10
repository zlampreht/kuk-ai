import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

async function jwtMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            'error': 'missing token'
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId }
        });
        if (!user) {
            return res.status(404).json({
                'error': 'user not found'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ 'error': 'invalid token' })
    }


}

function cleanupUser(user) {
    const { password, ...rest } = user;
    return rest;

}

export { prisma, jwtMiddleware, cleanupUser };