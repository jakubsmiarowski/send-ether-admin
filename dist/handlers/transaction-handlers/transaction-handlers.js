"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransactionHandler = exports.updateTransactionHandler = exports.getTransactionByPaymentGateIdHandler = exports.getTransactionsHandler = exports.addTransactionHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from, status, value, product, gasUsed, widgetToken, paymentGateId } = req.body;
    if (typeof to !== 'string' && to === '' && typeof status !== 'string' && status === '' &&
        typeof from !== 'string' && from === '' && typeof value !== 'number' &&
        typeof widgetToken !== 'string' && widgetToken === '' && typeof gasUsed !== 'number' && typeof paymentGateId !== 'number') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.findFirst({
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
        const transaction = yield prisma.transaction.create({
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
        });
        if (!transaction) {
            return res.send("Can't create transaction with that data");
        }
        return res.send(transaction);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addTransactionHandler = addTransactionHandler;
const getTransactionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield prisma.transaction.findMany();
        return res.send(transaction);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getTransactionsHandler = getTransactionsHandler;
const getTransactionByPaymentGateIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = yield prisma.transaction.findMany({
            where: {
                paymentGateId: parseInt(id)
            }
        });
        if (!transaction) {
            return res.send("Can't find transaction with that data");
        }
        return res.send(transaction);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getTransactionByPaymentGateIdHandler = getTransactionByPaymentGateIdHandler;
const updateTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (typeof id !== "string" && id === '' && typeof status !== 'string' && status === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = yield prisma.transaction.update({
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
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateTransactionHandler = updateTransactionHandler;
const deleteTransactionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== 'string' && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const transaction = yield prisma.transaction.delete({
            where: {
                id: parseInt(id)
            }
        });
        if (!transaction) {
            return res.send("Can't delete transaction with that id");
        }
        return res.send(transaction);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteTransactionHandler = deleteTransactionHandler;
//# sourceMappingURL=transaction-handlers.js.map