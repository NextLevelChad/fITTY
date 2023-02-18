import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        // logging and exericse.
        const { title } = req.body
        const result = await prisma.user.
        return res.json(result)
    }
}