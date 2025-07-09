import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma, cleanupUser } from '../util.js';
export async function register(req, res) {
    try {
        const { email, name, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        const hashedPassword = bcrypt.hashSync(password, 10);

        if (existingUser) {
            return res.json({
                'error': 'Email exists'
            })
        }

        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword }
        });


        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );


        res.json({
            token, user
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server ellrror'
        })
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (!existingUser) {
            return res.json({
                'error': 'No user'
            })
        }


        if (!bcrypt.compareSync(password, existingUser.password)) {
            return res.json({
                'error': 'invalid password '
            })
        }

        const token = jwt.sign(
            { userId: existingUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.json({
            token, user: cleanupUser(existingUser)
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Internal server ellrror'
        })
    }
}