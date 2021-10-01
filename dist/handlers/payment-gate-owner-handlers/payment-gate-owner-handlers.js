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
exports.getPGOwnerHandler = exports.addPGOwnerHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addPGOwnerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { githubId } = req.body;
    if (typeof githubId !== 'string' && githubId === '') {
        return res.send('Incorrect data');
    }
    try {
        const pgOwner = yield prisma.paymentGateOwner.create({
            data: {
                githubId: JSON.stringify(githubId)
            }
        });
        if (!pgOwner) {
            return res.send("Can't create paymentGateOwner with that username");
        }
        return res.send(pgOwner);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.addPGOwnerHandler = addPGOwnerHandler;
const getPGOwnerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { githubId } = req.params;
    if (typeof githubId !== 'string' && githubId === '') {
        return res.send('Incorrect data');
    }
    try {
        const pgOwner = yield prisma.paymentGateOwner.findFirst({
            where: {
                githubId: githubId
            }
        });
        if (!pgOwner) {
            return res.send("Can't find paymentGateOwner with that username");
        }
        return res.send(pgOwner);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getPGOwnerHandler = getPGOwnerHandler;
//# sourceMappingURL=payment-gate-owner-handlers.js.map