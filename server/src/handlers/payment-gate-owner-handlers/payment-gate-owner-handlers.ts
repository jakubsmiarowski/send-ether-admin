import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const addPGOwnerHandler = async (req: Request, res: Response) => {
    const {githubId} = req.body;
    if (typeof githubId !== 'string' && githubId === '') {
        return res.send('Incorrect data');
    }
    try {
        const pgOwner = await prisma.paymentGateOwner.create({
            data: {
                githubId: JSON.stringify(githubId)
            }
        })
        if (!pgOwner) {
            return res.send("Can't create paymentGateOwner with that username");
        }
        return res.send(pgOwner);
    } catch (error) {
        throw new Error(error);
    }
}

export const getPGOwnerHandler = async (req: Request, res: Response) => {
    const {githubId} = req.params;
    if (typeof githubId !== 'string' && githubId === '') {
        return res.send('Incorrect data');
    }
    try {
        const pgOwner = await prisma.paymentGateOwner.findFirst({
            where: {
                githubId: githubId
            }
        })
        if (!pgOwner) {
            return res.send("Can't find paymentGateOwner with that username");
        }
        return res.send(pgOwner);
    } catch (error) {
        throw new Error(error);
    }
}
