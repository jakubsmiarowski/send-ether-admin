import {Request, Response} from "express";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const addTransactionHandler = async (req: Request, res: Response) => {
    const {to, from, status, value, product, gasUsed, widgetToken, paymentGateId} = req.body;
    if (typeof to !== 'string' && to === '' && typeof status !== 'string' && status === '' &&
        typeof from !== 'string' && from === '' && typeof value !== 'number' &&
        typeof widgetToken !== 'string' && widgetToken === '' && typeof gasUsed !== 'number' && typeof paymentGateId !== 'number') {
        return res.send('Incorrect data');
    }
    try {
        const pg = await prisma.paymentGate.findFirst({
            where: {
                id: paymentGateId
            }
        });

        if (!pg) {
            return res.send("There is no Payment Gate with that token. Generate Widget Token and then you can make transactions!");
        }

        if (pg.status === 'DISABLED') {
            res.send("This Payment Gate is disabled, you can't make any transactions with that gate lol");
        }

        const transaction = await prisma.transaction.create({
            data: {
                to: to,
                from: from,
                status: status,
                value: value,
                product: product,
                gasUsed: gasUsed,
                paymentGate: {
                    connect: {
                        widgetToken: widgetToken
                    }
                }
            }
        })

        if (!transaction) {
            return res.send("Can't create transaction with that data");
        }
        return res.send(transaction);
    } catch (error) {
        throw new Error(error);
    }
}

export const getTransactionsHandler = async (req: Request, res: Response) => {
    try {
        const transaction = await prisma.transaction.findMany();
        return res.send(transaction);
    } catch (error) {
        throw new Error(error);
    }
}

export const getTransactionByPaymentGateIdHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = await prisma.transaction.findMany({
            where: {
                paymentGateId: parseInt(id)
            }
        });
        if (!transaction) {
            return res.send("Can't find transaction with that data");
        }
        return res.send(transaction);
    } catch (error) {
        throw new Error(error);
    }
}

export const updateTransactionHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {status} = req.body;
    if (typeof id !== "string" && id === '' && typeof status !== 'string' && status === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = await prisma.transaction.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                status: req.body.status
            }
        });
        if (!transaction) {
            return res.send("Can't update transaction with that id");
        }
        return res.send(transaction);
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteTransactionHandler = async (req: Request, res: Response) => {
    const {id} = req.params;
    if (typeof id !== 'string' && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = await prisma.transaction.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!transaction) {
            return res.send("Can't delete transaction with that id");
        }
        return res.send(transaction);
    } catch (error) {
        throw new Error(error);
    }
}
