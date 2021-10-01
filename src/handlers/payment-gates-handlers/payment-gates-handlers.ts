import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'

const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

function generateWidgetToken(githubId: string) {
    return jwt.sign(githubId, require('crypto').randomBytes(64).toString('hex'));
}

export const addPaymentGateHandler = async (req: Request, res: Response) => {
    const {githubId, status, url, name} = req.body;
    if (typeof githubId !== 'string' && githubId === '' && typeof status !== 'string' && status === '' &&
        typeof url !== 'string' && url === '' && typeof name !== 'string' && name === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.create({
            data: {
                name: name,
                widgetToken: generateWidgetToken(githubId),
                status: status,
                url: url,
                owner: {
                    connect: {
                        githubId: githubId
                    }
                }
            }
        });
        if (!pg) {
            return res.send("Can't create paymentGate with that data");
        }
        return res.send(pg);
    } catch (error) {
        throw new Error(error);
    }
}

export const getPaymentGatesByUserIdHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.findMany({
            where: {
                userId: parseInt(id)
            }
        });
        if (!pg) {
            return res.send("Can't find paymentGate with that id");
        }
        return res.send(pg);
    } catch (error) {
        throw new Error(error);
    }
}

export const getPaymentGatesTransactionsHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.findFirst({
            where: {
                id: parseInt(id)
            },
            select: {
                transactions: true
            }
        });
        if (!pg) {
            return res.send("Can't find paymentGate with that id");
        }
        res.send(pg.transactions);
    } catch (error) {
        throw new Error(error);
    }
}

export const checkPaymentGateStatus = async (req: Request, res: Response) => {
    const {widgetToken} = req.params;
    if (typeof widgetToken !== "string" && widgetToken === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.findUnique({
            where: {
                widgetToken: widgetToken
            }
        })
        if (!pg) {
            return res.send("Can't find paymentGate with that id");
        }
        return res.send(pg.status);
    } catch (error) {
        throw new Error(error);
    }
}

export const updatePaymentGateHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {status} = req.body;
    if (typeof id !== "string" && id === '' && typeof status !== 'string' && status === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: status
            }
        })
        if (!pg) {
            return res.send("Can't update paymentGate with that id");
        }
        return res.send(pg);
    } catch (error) {
        throw new Error(error);
    }
}

export const deletePaymentGateHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!pg) {
            return res.send("Can't delete paymentGate with that id");
        }
        return res.send(pg);
    } catch (error) {
        throw new Error(error);
    }
}
