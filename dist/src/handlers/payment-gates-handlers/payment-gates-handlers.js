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
exports.deletePaymentGateHandler = exports.updatePaymentGateHandler = exports.checkPaymentGateStatus = exports.getPaymentGatesTransactionsHandler = exports.getPaymentGatesByUserIdHandler = exports.addPaymentGateHandler = void 0;
const client_1 = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new client_1.PrismaClient();
function generateWidgetToken(githubId) {
    return jwt.sign(githubId, require('crypto').randomBytes(64).toString('hex'));
}
const addPaymentGateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { githubId, status, url, name } = req.body;
    if (typeof githubId !== 'string' && githubId === '' && typeof status !== 'string' && status === '' &&
        typeof url !== 'string' && url === '' && typeof name !== 'string' && name === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.create({
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
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addPaymentGateHandler = addPaymentGateHandler;
const getPaymentGatesByUserIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.findMany({
            where: {
                userId: parseInt(id)
            }
        });
        if (!pg) {
            return res.send("Can't find paymentGate with that id");
        }
        return res.send(pg);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getPaymentGatesByUserIdHandler = getPaymentGatesByUserIdHandler;
const getPaymentGatesTransactionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.findFirst({
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
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getPaymentGatesTransactionsHandler = getPaymentGatesTransactionsHandler;
const checkPaymentGateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { widgetToken } = req.params;
    if (typeof widgetToken !== "string" && widgetToken === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.findUnique({
            where: {
                widgetToken: widgetToken
            }
        });
        if (!pg) {
            return res.send("Can't find paymentGate with that id");
        }
        return res.send(pg.status);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.checkPaymentGateStatus = checkPaymentGateStatus;
const updatePaymentGateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (typeof id !== "string" && id === '' && typeof status !== 'string' && status === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: status
            }
        });
        if (!pg) {
            return res.send("Can't update paymentGate with that id");
        }
        return res.send(pg);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updatePaymentGateHandler = updatePaymentGateHandler;
const deletePaymentGateHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (typeof id !== "string" && id === '') {
        return res.send('Incorrect data');
    }
    try {
        const pg = yield prisma.paymentGate.delete({
            where: {
                id: parseInt(id)
            }
        });
        if (!pg) {
            return res.send("Can't delete paymentGate with that id");
        }
        return res.send(pg);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deletePaymentGateHandler = deletePaymentGateHandler;
//# sourceMappingURL=payment-gates-handlers.js.map