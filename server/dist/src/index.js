"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const root_handlers_1 = require("./handlers/root-handlers/root-handlers");
const payment_gate_owner_handlers_1 = require("./handlers/payment-gate-owner-handlers/payment-gate-owner-handlers");
const payment_gates_handlers_1 = require("./handlers/payment-gates-handlers/payment-gates-handlers");
const transaction_handlers_1 = require("./handlers/transaction-handlers/transaction-handlers");
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || '5000';
const cors = require('cors');
app.use(cors());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.json({ type: "text/*" }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
// Root Handlers
app.get('/', root_handlers_1.rootHandler);
app.post('/authenticate', root_handlers_1.authHandler);
// Payment Gate Owner Handlers
app.post('/user', payment_gate_owner_handlers_1.addPGOwnerHandler);
app.get('/user/:githubId', payment_gate_owner_handlers_1.getPGOwnerHandler);
// Payment Gates Handlers
app.post('/payment-gates', payment_gates_handlers_1.addPaymentGateHandler);
app.get('/payment-gates/:id', payment_gates_handlers_1.getPaymentGatesByUserIdHandler);
app.get('/payment-gates/status/:widgetToken', payment_gates_handlers_1.checkPaymentGateStatus);
app.get('/payment-gates/:id/transactions', payment_gates_handlers_1.getPaymentGatesTransactionsHandler);
app.put('/payment-gates/:id', payment_gates_handlers_1.updatePaymentGateHandler);
app.delete('/payment-gates/:id', payment_gates_handlers_1.deletePaymentGateHandler);
// Transaction Handlers
app.post('/transactions', transaction_handlers_1.addTransactionHandler);
app.get('/get-transactions', transaction_handlers_1.getTransactionsHandler);
app.get('/transactions/:id', transaction_handlers_1.getTransactionByPaymentGateIdHandler);
app.put('/transactions/:id', transaction_handlers_1.updateTransactionHandler);
app.delete('/transactions/:id', transaction_handlers_1.deleteTransactionHandler);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map